# Dockerfile (production multi-stage)
#####################################
# Stage: base (install extensions, composer, composer deps)
FROM php:8.2-fpm AS base

# set working dir
WORKDIR /var/www/html

# system deps required for many PHP extensions & common tools
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    libjpeg-dev libfreetype6-dev procps bash ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Configure & install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# redis extension
RUN pecl install redis && docker-php-ext-enable redis

# copy composer binary from official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# copy composer files only and install PHP deps (speeds up rebuilds)
COPY composer.json composer.lock /var/www/html/
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts
# copy application (rest of files)
COPY . /var/www/html

# ensure permissions for Laravel folders (runtime will also enforce)
RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Now that the full application (including artisan) is present, run Composer with scripts
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

#####################################
# Stage: final runtime (based on base stage to keep installed extensions)
FROM base AS final

# Install Node.js and npm so we can build frontend where PHP/Artisan exists
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Build frontend assets (Wayfinder calls Artisan, so PHP must be present)
WORKDIR /var/www/html
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi \
    && npm run build

# copy custom entrypoint
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# expose PHP-FPM port (nginx will connect to this)
EXPOSE 9000

# runtime user & default command
USER www-data
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]

