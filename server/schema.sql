-- 1. 使用者資料表
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '使用者帳號',
  `nickname` VARCHAR(50) NOT NULL COMMENT '顯示暱稱',
  `email` VARCHAR(100) NOT NULL UNIQUE COMMENT '電子信箱',
  `password_hash` VARCHAR(255) NOT NULL COMMENT '密碼雜湊值',
  `avatar_url` VARCHAR(255) DEFAULT NULL COMMENT '頭像圖片連結',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 摯友群組表 (App 強調分享給少數朋友或群組)
CREATE TABLE `friend_groups` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL COMMENT '群組名稱',
  `creator_id` INT NOT NULL COMMENT '建立者 ID',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 群組成員關係表 (多對多)
CREATE TABLE `group_members` (
  `group_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`, `user_id`),
  FOREIGN KEY (`group_id`) REFERENCES `friend_groups`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 食物紀錄表 (核心內容：照片、狀態、發布到哪個群組)
CREATE TABLE `meals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL COMMENT '發布者 ID',
  `group_id` INT NOT NULL COMMENT '分享的群組 ID',
  `photo_url` VARCHAR(255) NOT NULL COMMENT '食物照片連結',
  `caption` VARCHAR(255) DEFAULT NULL COMMENT '即時報備文字/狀態',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '用餐/記錄時間',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`group_id`) REFERENCES `friend_groups`(`id`) ON DELETE CASCADE,
  INDEX `idx_group_created` (`group_id`, `created_at`) COMMENT '加速 Home 頁面按時間排序撈取'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. 互動回應表 (支援簡短文字回覆或單純點擊 Emoji)
CREATE TABLE `reactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `meal_id` INT NOT NULL COMMENT '對應的食物紀錄 ID',
  `user_id` INT NOT NULL COMMENT '回應者 ID',
  `emoji` VARCHAR(20) DEFAULT NULL COMMENT '留下的 Emoji 符號',
  `text_content` VARCHAR(100) DEFAULT NULL COMMENT '簡短文字回應',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`meal_id`) REFERENCES `meals`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. 共同食物塔狀態表 (追蹤每個群組的食物塔數據)
CREATE TABLE `food_towers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL UNIQUE COMMENT '一個群組對應一座塔',
  `current_height` INT DEFAULT 0 COMMENT '目前食物塔高度',
  `total_meals_count` INT DEFAULT 0 COMMENT '累計記錄食物次數',
  `level` INT DEFAULT 1 COMMENT '食物塔當前等級',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`group_id`) REFERENCES `friend_groups`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. 餐廳/地點收藏表 (對應簡報中的 saved places)
CREATE TABLE `saved_places` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL COMMENT '收藏者 ID',
  `place_name` VARCHAR(100) NOT NULL COMMENT '餐廳或地點名稱',
  `address` VARCHAR(255) DEFAULT NULL COMMENT '地址描述',
  `latitude` DECIMAL(10, 8) DEFAULT NULL COMMENT '緯度 (地圖標記用)',
  `longitude` DECIMAL(11, 8) DEFAULT NULL COMMENT '經度 (地圖標記用)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_user_place` (`user_id`, `place_name`) COMMENT '防止同一位使用者重複收藏同名地點'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;