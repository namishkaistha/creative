import { SnapContainer } from "@/components/SnapContainer";
import { Section } from "@/components/Section";
import { SectionRail } from "@/components/SectionRail";
import { Intro } from "@/components/sections/Intro";
import { Shortform } from "@/components/sections/Shortform";
import { Longform } from "@/components/sections/Longform";
import { Writing } from "@/components/sections/Writing";
import { Fun } from "@/components/sections/Fun";
import { Lastly } from "@/components/sections/Lastly";

const SECTIONS = [
  { id: "hi-deepa", label: "Hi Deepa", node: <Intro /> },
  { id: "shortform", label: "Shortform", node: <Shortform /> },
  { id: "longform", label: "Longform", node: <Longform /> },
  { id: "writing", label: "Writing", node: <Writing /> },
  { id: "fun", label: "For fun", node: <Fun /> },
  { id: "lastly", label: "Lastly", node: <Lastly /> },
] as const;

export default function Home() {
  return (
    <SnapContainer>
      {SECTIONS.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          number={index + 1}
          total={SECTIONS.length}
          label={section.label}
        >
          {section.node}
        </Section>
      ))}
      <SectionRail pips={SECTIONS} />
    </SnapContainer>
  );
}
