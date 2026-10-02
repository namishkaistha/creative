import type { ReactNode } from "react";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { SnapContainer } from "@/components/SnapContainer";
import { Section } from "@/components/Section";
import { SectionRail } from "@/components/SectionRail";
import { MediaModalProvider } from "@/components/MediaModal";
import { Intro } from "@/components/sections/Intro";
import { Shortform } from "@/components/sections/Shortform";
import { Longform } from "@/components/sections/Longform";
import { Writing } from "@/components/sections/Writing";
import { Fun } from "@/components/sections/Fun";
import { Connect } from "@/components/sections/Connect";

const SECTION_CONTENT: Record<SectionId, ReactNode> = {
  hi: <Intro />,
  shortform: <Shortform />,
  longform: <Longform />,
  writing: <Writing />,
  fun: <Fun />,
  connect: <Connect />,
};

export default function Home() {
  return (
    <MediaModalProvider>
      <SnapContainer>
        {SECTIONS.map((section, index) => (
          <Section
            key={section.id}
            id={section.id}
            number={index + 1}
            total={SECTIONS.length}
            label={section.label}
          >
            {SECTION_CONTENT[section.id]}
          </Section>
        ))}
        <SectionRail pips={SECTIONS} />
      </SnapContainer>
    </MediaModalProvider>
  );
}
