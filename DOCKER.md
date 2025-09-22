# Docker Setup for AI Code Review Copilot

This project is now dockerized with MySQL and Redis support. Follow the instructions below to get started.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git

## Quick Start

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd ai-code-review-copilot
   ```

2. **Create environment file:**
   ```bash
   copy env.docker .env
   ```

3. **Build and start the containers:**
   ```bash
   npm run docker:build
   npm run docker:up
   ```

4. **Access the application:**
   - Application: http://localhost:8000
   - MySQL: localhost:3306
   - Redis: localhost:6379

## Available Docker Commands

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build Docker images |
| `npm run docker:up` | Start containers in background |
| `npm run docker:down` | Stop and remove containers |
| `npm run docker:restart` | Restart containers |
| `npm run docker:logs` | View container logs |
| `npm run docker:shell` | Access app container shell |
| `npm run docker:mysql` | Access MySQL CLI |
| `npm run docker:redis` | Access Redis CLI |

## Services

### Application (app)
- **Image**: Custom PHP 8.2 with Apache
- **Port**: 8000
- **Features**:
  - PHP 8.2 with required extensions
  - Composer for PHP dependencies
  - Node.js for frontend build
  - Apache with mod_rewrite
  - Supervisor for process management
  - Queue worker for background jobs

### MySQL (mysql)
- **Image**: MySQL 8.0
- **Port**: 3306
- **Database**: ai_code_review
- **Credentials**:
  - Root: password
  - User: laravel / password

### Redis (redis)
- **Image**: Redis 7 Alpine
- **Port**: 6379
- **Features**: Used for caching, sessions, and queues

### Node.js (node)
- **Image**: Node.js 18 Alpine
- **Port**: 5173
- **Purpose**: Frontend development server

## Environment Configuration

The application uses the following environment variables:

```env
# Database
DB_CONNECTION=mysql
DB_HOST=mysql
DB_DATABASE=ai_code_review
DB_USERNAME=root
DB_PASSWORD=password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Cache & Sessions
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

## Development Workflow

### First Time Setup
1. Build containers: `npm run docker:build`
2. Start services: `npm run docker:up`
3. Wait for containers to be ready
4. Access the application at http://localhost:8000

### Making Changes
- **PHP/Laravel**: Changes are reflected immediately (volume mounted)
- **Frontend**: Run `npm run docker:restart` to rebuild frontend assets
- **Database**: Migrations run automatically on container start

### Debugging
- View logs: `npm run docker:logs`
- Access shell: `npm run docker:shell`
- Check database: `npm run docker:mysql`
- Check Redis: `npm run docker:redis`

## Troubleshooting

### Container won't start
- Check logs: `npm run docker:logs`
- Ensure ports 8000, 3306, 6379 are not in use
- Try rebuilding: `npm run docker:down && npm run docker:build && npm run docker:up`

### Database connection issues
- Ensure MySQL container is running: `docker-compose ps`
- Check MySQL logs: `docker-compose logs mysql`
- Verify environment variables in .env file

### Frontend not loading
- Check if Node.js container is running
- Restart containers: `npm run docker:restart`
- Check Vite configuration

### Permission issues
- Ensure storage directories are writable
- Run: `docker-compose exec app chown -R www-data:www-data storage`

## Production Considerations

For production deployment:

1. **Security**:
   - Change default passwords
   - Use environment-specific .env files
   - Enable SSL/TLS

2. **Performance**:
   - Use production PHP settings
   - Optimize MySQL configuration
   - Enable Redis persistence

3. **Monitoring**:
   - Add health checks
   - Set up logging aggregation
   - Monitor resource usage

## Stopping the Application

To stop all services:
```bash
npm run docker:down
```

To stop and remove all data (including databases):
```bash
docker-compose down -v
```
