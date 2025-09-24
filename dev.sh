#!/bin/bash

set -e

echo "🚀 Starting Laravel Dev Environment..."

# Step 0: Ensure .env exists
if [ ! -f ".env" ]; then
  echo "⚙️  No .env file found. Copying from .env.example..."
  cp .env.example .env
else
  echo "⚙️  .env file already exists, skipping copy."
fi

# Step 1: Build & start containers
echo "🔨 Building and starting Docker containers..."
docker compose up -d --build

# Step 2: Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
until docker compose exec -T mysql mysqladmin ping -h "localhost" --silent; do
  sleep 2
done
echo "✅ MySQL is up!"

# Step 3: Install Composer dependencies (if vendor/ missing)
if [ ! -d "vendor" ]; then
  echo "📦 Installing Composer dependencies..."
  docker compose exec -T app composer install
else
  echo "📦 Vendor directory already exists, skipping composer install."
fi

# Step 4: Install Node dependencies (if node_modules/ missing)
if [ ! -d "node_modules" ]; then
  echo "📦 Installing Node dependencies..."
  docker compose exec -T node npm install
else
  echo "📦 node_modules directory already exists, skipping npm install."
fi

# Step 5: Generate APP_KEY if not set
APP_KEY=$(docker compose exec -T app php artisan tinker --execute="echo config('app.key');")
if [ -z "$APP_KEY" ]; then
  echo "🔑 Generating APP_KEY..."
  docker compose exec -T app php artisan key:generate
else
  echo "🔑 APP_KEY already exists, skipping."
fi

# Step 6: Run migrations & seeders
echo "🗄️  Running database migrations and seeders..."
docker compose exec -T app php artisan migrate --seed || echo "⚠️  Migration failed (maybe already migrated)."

# Step 7: Clear & warm caches
echo "🧹 Clearing and warming caches..."
docker compose exec -T app php artisan config:clear
docker compose exec -T app php artisan route:clear
docker compose exec -T app php artisan view:clear
docker compose exec -T app php artisan cache:clear
docker compose exec -T app php artisan config:cache || true
docker compose exec -T app php artisan route:cache || true
docker compose exec -T app php artisan view:cache || true

# Step 8: Start Vite dev server
echo "🎨 Starting Vite (hot reload)..."
docker compose exec -T node npm run dev &

echo ""
echo "✅ Laravel Dev Environment is ready!"
echo "🌍 App: http://localhost:8000"
echo "🛢️  Adminer: http://localhost:8080"
echo "📦 Redis Commander: http://localhost:8081"
echo ""
