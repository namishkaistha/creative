# Changelog

## 2026-09-30

### Added
- Shared like counts. `GET/POST/DELETE /api/likes` stores one like per visitor IP per section in Neon Postgres (`likes` table, keyed on section + HMAC-hashed IP; raw IPs are never stored). Requires `DATABASE_URL` and `LIKES_SALT`.
- `npm test` runs the likes unit tests with Node's built-in test runner.

### Changed
- Section heart button replaced with the interior.dev Like Burst toggle. Counts now come from the API and are shared across visitors; the previous per-browser localStorage hearts are no longer read.
