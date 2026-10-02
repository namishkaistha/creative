# Changelog

## 2026-10-02

### Added
- "Say hi" section at the end of the page with email, LinkedIn, GitHub, Instagram, TikTok and Substack links.

### Changed
- The intro cue reads "scroll" instead of "swipe", and the site description now says "scroll-through".

### Fixed
- The page no longer gets a sideways scrollbar. The scroller and sections were sized to the full window width (`w-screen`), which includes the vertical scrollbar, so they overflowed horizontally. They now fill their container and clip horizontal overflow.

## 2026-09-30

### Added
- Shared like counts: one like per visitor IP per section, stored in Neon Postgres (`likes` table, keyed on section + HMAC-hashed IP; raw IPs are never stored). Requires `DATABASE_URL` and `LIKES_SALT`. Changing `LIKES_SALT` makes every past visitor look new.
- Likes are read server-side (one query per request, streamed in behind `<Suspense>`) and written through the `likeSection` / `unlikeSection` Server Actions, which Next restricts to same-origin callers.
- `lib/sections.ts` is the single list of sections; `SectionId` is typed from it and used by the page, video players and likes.
- `npm test` runs unit tests with Node's built-in runner via `tsx`.

### Changed
- Section heart button replaced with the interior.dev Like Burst toggle. The previous per-browser localStorage hearts are no longer read.
- The home page is now rendered per request (it reads the visitor's IP for like state) instead of being fully static.
