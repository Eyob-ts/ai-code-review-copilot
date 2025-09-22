-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS ai_code_review;

-- Use the database
USE ai_code_review;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'laravel'@'%' IDENTIFIED BY 'password';

-- Grant all privileges to the user
GRANT ALL PRIVILEGES ON ai_code_review.* TO 'laravel'@'%';

-- Flush privileges
FLUSH PRIVILEGES;
