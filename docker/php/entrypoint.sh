#!/usr/bin/env bash
set -e

# ---------- helper: wait for tcp ----------
wait_for_port() {
  host="$1"
  port="$2"
  echo "Waiting for $host:$port ..."
  until bash -c "cat < /dev/tcp/$host/$port" >/dev/null 2>&1; do
    sleep 1
  done
  echo "$host:$port is available"
}

# Wait for DB and Redis (if set)
: "${DB_HOST:=mysql}"
: "${DB_PORT:=3306}"
wait_for_port "$DB_HOST" "$DB_PORT"

if [ -n "${REDIS_HOST}" ]; then
  : "${REDIS_PORT:=6379}"
  wait_for_port "$REDIS_HOST" "$REDIS_PORT"
  #Additional Redis readiness check
  echo "Testing Redis connection...."
  until redis-cli -h "REDIS_HOST" -p "REDIS_PORT" ping | grep -q PONG; do
    echo "Redis not ready yet, waiting..."
    sleep 1
    done
    echo "Redis is ready!"
fi

# Set permissions (safe defaults)
chown -R www-data:www-data /var/www/html || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache || true

# Install composer dependencies if vendor missing (helpful for mounted dev volumes)
if [ ! -d /var/www/html/vendor ] || [ ! -f /var/www/html/vendor/autoload.php ]; then
  echo "Vendor not found. Installing composer dependencies..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# If environment variable says to run migrations/seeders: run them (useful for CI/CD)
if [ "${APP_RUN_MIGRATIONS:-false}" = "true" ]; then
  echo "Running migrations..."
  php artisan migrate --force
fi

if [ "${APP_SEED:-false}" = "true" ]; then
  echo "Running seeders..."
  php artisan db:seed --force
fi

# Cache / config optimizations is optional
if [ "${APP_OPTIMIZE:-false}" = "true" ]; then
  echo "Optimizing (config, route, view caches)..."
  php artisan config:cache && php artisan route:cache && php artisan view:cache || true
else
  # keep dev-friendly caches cleared
  php artisan cache:clear || true
  php artisan config:clear || true
  php artisan route:clear || true
  php artisan view:clear || true
fi

# Execute container CMD
echo "Starting PHP-FPM..."
exec "$@"
