# =============================
# 1️⃣ Base PHP Image
# =============================
FROM php:8.2-fpm AS base

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    libjpeg-dev libfreetype6-dev procps bash ca-certificates redis-tools \
    netcat-openbsd \
    nodejs npm \
 && rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# =============================
# 2️⃣ Composer Dependencies
# =============================
FROM base AS composer_deps

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# =============================
# 3️⃣ Frontend Build (PHP + Node)
# =============================
FROM base AS frontend

WORKDIR /var/www/html
COPY . .
RUN npm ci && npm run build

# =============================
# 4️⃣ Final Runtime Image
# =============================
FROM base AS final

WORKDIR /var/www/html

# Copy vendor deps
COPY --from=composer_deps /var/www/html/vendor ./vendor

# Copy application files
COPY . .

# Copy built assets
COPY --from=frontend /var/www/html/public/build ./public/build

# Optimize autoload and discover packages
RUN composer dump-autoload --optimize && php artisan package:discover

RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 775 storage bootstrap/cache

COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:9000 || exit 1

USER www-data
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
