export const SECTIONS = [
  { id: "hi", label: "Hi" },
  { id: "shortform", label: "Shortform" },
  { id: "longform", label: "Longform" },
  { id: "writing", label: "Writing" },
  { id: "fun", label: "For fun" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export function isSectionId(value: unknown): value is SectionId {
  return SECTIONS.some((section) => section.id === value);
}
