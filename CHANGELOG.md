# Changelog

## 2026-10-07

### Fixed
- The site now adapts to the laptop it's on. Every page is one screen tall, so on screens 1024px and wider the base text size follows the window (16px at 1440x900, smaller on short screens, up to 24px on big ones) and the whole layout scales with it. On 1280x720 and 1366x768 the third shortform clip and the third podcast guest were cut off at the bottom; on 1920x1080 and larger everything sat small in a mostly empty page. The fixed pixel text sizes were converted to rem so they scale too. Phones are unchanged.

## 2026-10-02

### Added
- "Say hi" section at the end of the page with circular icon links to Substack, TikTok, Instagram, LinkedIn and email.

### Changed
- The Instagram icon in "Say hi" links to @nam_yaps, alongside TikTok @namyaps.
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
