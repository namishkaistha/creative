// Must match the section ids in app/page.tsx; the API rejects likes for any other id.
export const LIKEABLE_SECTION_IDS = ["hi", "shortform", "longform", "writing", "fun"] as const;
