import Image from "next/image";
import Link from "next/link";
import portrait from "@/assets/portrait.jpg";

const RESUME_URL = "/Kaistha_Namish_Resume.pdf";

export function Intro() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-6 pt-24 pb-28 sm:pb-32">
      <PortraitFrame />
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl">
          Hi Deepa,
          <br />
          I&rsquo;m Namish <span aria-hidden>👋</span>
        </h1>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-dim">
          My{" "}
          <Link
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-rail-strong underline-offset-4 transition hover:decoration-accent"
          >
            resume
          </Link>{" "}
          is boring and corporate, so I vibecoded this to show off my creative
          endeavors. All the words are me though, not ai. Feel free to drop a
          like on the pages you think are cool, and click on any videos to see
          them full-screen.
        </p>
      </div>
      <SwipeCue />
    </div>
  );
}

function PortraitFrame() {
  return (
    <div className="relative aspect-[3/4] w-36 overflow-hidden rounded-2xl ring-1 ring-rail sm:w-44">
      <Image
        src={portrait}
        alt="Namish Kaistha"
        placeholder="blur"
        className="h-full w-full scale-[1.35] object-cover object-[center_25%]"
        sizes="(min-width: 640px) 176px, 144px"
        priority
      />
    </div>
  );
}

function SwipeCue() {
  return (
    <div className="flex flex-col items-center gap-2 text-ink-mute">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
        swipe
      </span>
      <span
        aria-hidden
        className="block h-6 w-px animate-pulse bg-gradient-to-b from-rail-strong to-transparent"
      />
    </div>
  );
}
