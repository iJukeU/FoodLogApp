"""
FoodLog App — FastAPI Backend Server
=====================================
POST /api/meals  →  建立食物紀錄 + 更新食物塔（使用 MySQL Transaction）
"""

from __future__ import annotations

import os
from contextlib import contextmanager
from datetime import datetime
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import mysql.connector
from mysql.connector import pooling

# ── 環境變數 ─────────────────────────────────────────────────
# .env 檔位於專案根目錄（比 server/ 上一層）
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "foodlog"),
}

# ── 連線池 ───────────────────────────────────────────────────
pool = pooling.MySQLConnectionPool(
    pool_name="foodlog_pool",
    pool_size=5,
    pool_reset_session=True,
    **DB_CONFIG,
)


@contextmanager
def get_connection():
    """取得連線；離開 context 時自動歸還至 pool。"""
    conn = pool.get_connection()
    try:
        yield conn
    finally:
        conn.close()


# ── FastAPI 初始化 ────────────────────────────────────────────
app = FastAPI(title="FoodLog API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # 開發階段允許全部；上線可改成前端 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response Models ────────────────────────────────
class MealCreate(BaseModel):
    user_id: int
    group_id: int
    photo_url: str
    caption: Optional[str] = None


class MealOut(BaseModel):
    """對應 schema.sql 中的 `meals` 表所有欄位。"""
    id: int
    user_id: int
    group_id: int
    photo_url: str
    caption: Optional[str]
    created_at: datetime


class FoodTowerOut(BaseModel):
    """對應 schema.sql 中的 `food_towers` 表所有欄位 + 額外的 leveled_up 旗標。"""
    id: int
    group_id: int
    current_height: int
    total_meals_count: int
    level: int
    updated_at: datetime
    leveled_up: bool            # 本次是否升級（非 DB 欄位，僅供前端判斷）


class MealResponse(BaseModel):
    meal: MealOut
    food_tower: FoodTowerOut


# ── 核心路由: POST /api/meals ────────────────────────────────
@app.post("/api/meals", response_model=MealResponse, status_code=201)
def create_meal(body: MealCreate):
    """
    建立一筆食物紀錄，並在同一個 Transaction 中更新食物塔。

    Transaction 流程（對應 schema.sql 表結構）：
      Step A — INSERT INTO `meals` (user_id, group_id, photo_url, caption)
      Step B — UPDATE `food_towers` SET current_height+1, total_meals_count+1
      Step C — 若 current_height 變成 10 的倍數 → level+1
    任何步驟出錯 → ROLLBACK。

    注意：`meals` 表有 FK 約束指向 `users`(id) 和 `friend_groups`(id)，
    若傳入不存在的 user_id 或 group_id，MySQL 會觸發 IntegrityError。
    """
    with get_connection() as conn:
        cursor = conn.cursor(dictionary=True)
        leveled_up = False

        try:
            conn.start_transaction()

            # ── Step A: 寫入 `meals` 表 ──────────────────────
            # 欄位對應 schema.sql 第 4 張表：
            #   `id`         → AUTO_INCREMENT (自動產生)
            #   `user_id`    → FK → users.id
            #   `group_id`   → FK → friend_groups.id
            #   `photo_url`  → NOT NULL
            #   `caption`    → DEFAULT NULL（可選填）
            #   `created_at` → DEFAULT CURRENT_TIMESTAMP（自動產生）
            cursor.execute(
                """
                INSERT INTO `meals` (`user_id`, `group_id`, `photo_url`, `caption`)
                VALUES (%s, %s, %s, %s)
                """,
                (body.user_id, body.group_id, body.photo_url, body.caption),
            )
            new_meal_id = cursor.lastrowid

            # ── Step B: 更新 `food_towers` 表 (height+1, count+1)
            # 欄位對應 schema.sql 第 6 張表：
            #   `current_height`    → +1
            #   `total_meals_count` → +1
            #   `updated_at`        → ON UPDATE CURRENT_TIMESTAMP（自動更新）
            cursor.execute(
                """
                UPDATE `food_towers`
                   SET `current_height`    = `current_height` + 1,
                       `total_meals_count` = `total_meals_count` + 1
                 WHERE `group_id` = %s
                """,
                (body.group_id,),
            )

            if cursor.rowcount == 0:
                raise HTTPException(
                    status_code=404,
                    detail=f"food_tower not found for group_id={body.group_id}. "
                           f"請先在 `food_towers` 表中為此群組建立初始資料。",
                )

            # ── Step C: 升級判斷 (每 10 層 level +1) ──────────
            cursor.execute(
                """
                SELECT `current_height`
                  FROM `food_towers`
                 WHERE `group_id` = %s
                """,
                (body.group_id,),
            )
            tower_row = cursor.fetchone()

            if tower_row and tower_row["current_height"] % 10 == 0:
                cursor.execute(
                    """
                    UPDATE `food_towers`
                       SET `level` = `level` + 1
                     WHERE `group_id` = %s
                    """,
                    (body.group_id,),
                )
                leveled_up = True

            # ── Commit ────────────────────────────────────────
            conn.commit()

            # ── 回傳完整資料 ──────────────────────────────────
            # 從 DB 重新 SELECT，確保拿到包含 created_at / updated_at 的完整列
            cursor.execute(
                "SELECT * FROM `meals` WHERE `id` = %s",
                (new_meal_id,),
            )
            meal = cursor.fetchone()

            cursor.execute(
                "SELECT * FROM `food_towers` WHERE `group_id` = %s",
                (body.group_id,),
            )
            tower = cursor.fetchone()

            return MealResponse(
                meal=MealOut(**meal),
                food_tower=FoodTowerOut(**tower, leveled_up=leveled_up),
            )

        except HTTPException:
            conn.rollback()
            raise

        except mysql.connector.IntegrityError as exc:
            # FK 約束失敗：user_id 或 group_id 在父表中不存在
            conn.rollback()
            raise HTTPException(
                status_code=422,
                detail=f"FK constraint failed — 請確認 user_id={body.user_id} 存在於 `users` 表，"
                       f"且 group_id={body.group_id} 存在於 `friend_groups` 表。"
                       f"(MySQL: {str(exc)})",
            ) from exc

        except Exception as exc:
            conn.rollback()
            raise HTTPException(
                status_code=500,
                detail=f"Transaction failed: {str(exc)}",
            ) from exc

        finally:
            cursor.close()


# ── Health check ─────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"status": "ok"}
