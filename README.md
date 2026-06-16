# FoodLog App

FoodLog 是一個以「生存報備」為核心的飲食社交 App 前端原型。此版本可在 localhost 展示主要流程與視覺方向。

## 功能範圍

- Home：好友飲食動態牆、低負擔 Reactions、紙飛機分享、相簿/鏡頭切換、拍攝後食物圖示飛入食物塔動畫。
- Growth：共同塔與個人塔切換，將飲食紀錄堆疊成食物塔，左右顯示名稱、日期、熱量與地點。
- Review：月曆牆呈現每日首張分享照片，Recap 顯示本月塔高、總熱量與飲食分類。
- Stats：用主題式卡片呈現卡路里、餐廳收藏、飲食多樣性與最近紀錄。
- Chat：好友聊天列表與訊息頁，支援飲食確認與聚餐安排情境展示。

## 本機運行

```bash
npm install
npm run dev
```

預設網址：

```text
http://localhost:3000
```

## 準備推上 GitHub

```bash
git init
git add .
git commit -m "Initial FoodLog frontend prototype"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```
