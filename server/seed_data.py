"""Insert seed data for testing: user, group, and food_tower."""
import os
import mysql.connector

conn = mysql.connector.connect(
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", "3306")),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", ""),
    database="foodlog"
)
cursor = conn.cursor()

# Test user (id=1)
cursor.execute(
    "INSERT IGNORE INTO users (id, username, nickname, email, password_hash) "
    "VALUES (1, 'testuser', 'Test User', 'test@test.com', 'dummy_hash')"
)

# Test group (id=1)
cursor.execute(
    "INSERT IGNORE INTO friend_groups (id, name, creator_id) "
    "VALUES (1, 'Test Group', 1)"
)

# Add user to group
cursor.execute(
    "INSERT IGNORE INTO group_members (group_id, user_id) VALUES (1, 1)"
)

# Food tower for group 1
cursor.execute(
    "INSERT INTO food_towers (group_id, current_height, total_meals_count, level) "
    "VALUES (1, 0, 0, 1) "
    "ON DUPLICATE KEY UPDATE group_id = group_id"
)

conn.commit()
cursor.close()
conn.close()
print("Seed data inserted successfully!")
