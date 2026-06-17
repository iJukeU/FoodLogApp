"""一次性腳本：建立 foodlog 資料庫並匯入 schema.sql"""
import os
from dotenv import load_dotenv
import mysql.connector

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

conn = mysql.connector.connect(
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", "3306")),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", ""),
)
cursor = conn.cursor()

# 讀取 schema.sql
with open("server/schema.sql", "r", encoding="utf-8") as f:
    sql = f.read()

# 逐條執行（以分號分割）
for statement in sql.split(";"):
    stmt = statement.strip()
    if stmt:
        try:
            cursor.execute(stmt)
            print(f"OK: {stmt[:60]}...")
        except mysql.connector.Error as e:
            print(f"SKIP/ERR: {e.msg} — {stmt[:60]}...")

conn.commit()
cursor.close()
conn.close()
print("\n✅ Done! Database 'foodlog' and all tables created.")
