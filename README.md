# AI Code Review Copilot

![Lint Status](https://github.com/Eyob-ts/ai-code-review-copilot/actions/workflows/lint.yml/badge.svg)
![Test Status](https://github.com/Eyob-ts/ai-code-review-copilot/actions/workflows/tests.yml/badge.svg)

An opinionated Laravel + Inertia React starter focused on developer experience, code quality, and a modern toolchain. This repo includes ESLint + Prettier, Laravel Pint, Vite, Tailwind, CI workflows, and Docker support for a smooth local and CI setup.

## Features

- Modern stack: Laravel 12, Inertia.js, React 19, Vite 7, Tailwind CSS 4
- First-class DX: ESLint + Prettier + Pint configured out of the box
- GitHub Actions: Linting and tests on PRs and pushes to `develop` and `main`
- Dockerized dev with MySQL and Redis
- Opinionated project structure and scripts

## Tech Stack

- Backend: `laravel/framework@^12`
- Frontend: `react@^19`, `@inertiajs/react@^2`, `vite@^7`, `tailwindcss@^4`
- Tooling: ESLint 9, Prettier 3, Pint, PHPUnit 11, Pest 3 (available)

## Getting Started (Local)

Prerequisites: PHP 8.2+, Composer, Node 18+ (or 22 as used in CI), npm

1. Install dependencies
   ```bash
   composer install
   npm install
   ```
2. Set up environment
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
3. Run the app
   ```bash
   # run backend + vite + queue concurrently (see composer.json)
   composer run dev
   # or run separately
   php artisan serve
   npm run dev
   ```

## Docker (MySQL + Redis)

See `DOCKER.md` for full details. Quick start:

```bash
copy env.docker .env  # Windows
# cp env.docker .env   # macOS/Linux

npm run docker:build
npm run docker:up
```

Services:
- App: http://localhost:8000
- MySQL: localhost:3306 (db `ai_code_review`)
- Redis: localhost:6379

## Scripts

Common npm scripts (see `package.json`):

- `npm run dev` – Vite dev server
- `npm run build` – Build frontend assets
- `npm run format` / `format:check` – Prettier
- `npm run lint` – ESLint
- `npm run types` – TypeScript typecheck
- Docker helpers: `docker:*` (build, up, down, logs, shell, mysql, redis)

Composer scripts (see `composer.json`):

- `composer run dev` – Run Laravel server, queue worker, and Vite concurrently
- `composer test` – Clear config cache and run tests

## Testing

```bash
php artisan test
# or
./vendor/bin/phpunit
```

`phpunit.xml` is configured for fast testing (array cache/session, low bcrypt rounds). You can switch to SQLite in-memory tests if needed by uncommenting the env in `phpunit.xml` and adding the relevant DB setup.

## CI

GitHub Actions run on pushes/PRs to `develop` and `main`:

- Lint workflow: `.github/workflows/lint.yml`
- Tests workflow: `.github/workflows/tests.yml`

Status badges are at the top of this README. If you fork/rename the repo, update the badge URLs accordingly.

## Contributing

Contributions are welcome! Please:

1. Open an issue describing the change
2. Create a feature branch
3. Run linters and tests locally
4. Open a PR using the provided template

See `CONTRIBUTING.md` for guidelines.

## License

MIT