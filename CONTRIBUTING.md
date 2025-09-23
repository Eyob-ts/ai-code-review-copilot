# Contributing to AI Code Review Copilot

Thanks for taking the time to contribute!

## Development Setup

1. Clone the repository and install dependencies
   ```bash
   composer install
   npm install
   ```
2. Copy environment and generate app key
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
3. Run the app
   ```bash
   composer run dev
   # or
   php artisan serve
   npm run dev
   ```

## Code Style

- PHP: Laravel Pint (`vendor/bin/pint`)
- JS/TS: ESLint + Prettier (`npm run lint` and `npm run format`)
- Type check: `npm run types`

Before opening a PR, please run:
```bash
vendor/bin/pint
npm run format
npm run lint
php artisan test
```

## Branching & Commits

- Use feature branches from `develop` (e.g., `feat/scope-description`, `fix/bug-description`).
- Use clear, concise commit messages (e.g., `feat: add review summary component`).

## Pull Requests

- Fill in the PR template fully.
- Keep PRs focused and small where possible.
- Include screenshots or recordings for UI changes.
- Ensure CI checks (lint and tests) are passing.

## Testing

- Run tests locally with `php artisan test` or `./vendor/bin/phpunit`.
- Add or update tests for new features and bug fixes.

## Docker (Optional)

If using Docker, see `DOCKER.md` for commands. Quick start:
```bash
copy env.docker .env  # Windows
# cp env.docker .env  # macOS/Linux
npm run docker:build
npm run docker:up
```

## Security

Do not include secrets or credentials in code or PRs. Use environment variables and `.env` files, which are already gitignored.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
