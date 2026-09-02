import { VideoPlayer } from "../VideoPlayer";

const SECTION_ID = "shortform";

const CLIPS = [
  {
    src: "/videos/thailand.web.mp4",
    poster: "/videos/thailand.jpg",
    caption: "my friends and i vlogging our thailand trip.",
    tilt: "-rotate-3",
  },
  {
    src: "/videos/barcrawl.web.mp4",
    poster: "/videos/barcrawl.jpg",
    caption: "my vlog of a 'challenge' bar crawl my friends hosted.",
    tilt: "rotate-2",
  },
  {
    src: "/videos/intention.web.mp4",
    poster: "/videos/intention.jpg",
    caption: "talking about living with intention.",
    tilt: "-rotate-2",
  },
] as const;

const NOTES = [
  "I've made around 100 of these videos.",
  "When I doomscroll, I study people's hooks, trends that worked, and strategies I can steal for my own — my main challenge lately has been taking a trend and making it mine.",
  "I run a weekly content calendar to dump ideas, script, and iterate.",
];

export function Shortform() {
  return (
    <div className="relative flex h-full w-full flex-col gap-2 px-5 pt-14 pb-6 sm:px-10">
      <ShortformHeader />
      <ClipScatter />
      <ShortformSocials />
      <InterestingNotes />
    </div>
  );
}

function ShortformHeader() {
  return (
    <div className="flex max-w-2xl flex-col gap-2 pr-40 sm:pr-64">
      <h2 className="font-display text-4xl leading-none font-bold tracking-tight text-ink sm:text-5xl">
        shortform.
      </h2>
      <p className="text-[13px] leading-relaxed text-ink-dim sm:text-sm">
        I started making shortform content in looking for new creative avenues
        after my podcast, and thought it would be fun to start vlogging my
        travels post-grad. It turned into{" "}
        <span className="text-ink">@namyaps</span>, where I vlog my days and
        talk through my experiences and thoughts being 23.
      </p>
    </div>
  );
}

function ClipScatter() {
  return (
    <div className="relative mx-auto mt-4 flex w-full max-w-md flex-1 flex-col justify-start gap-6 sm:gap-8">
      <ClipRow clip={CLIPS[0]} align="left" />
      <ClipRow clip={CLIPS[1]} align="right" />
      <ClipRow clip={CLIPS[2]} align="left" />
    </div>
  );
}

function ClipRow({
  clip,
  align,
}: {
  clip: (typeof CLIPS)[number];
  align: "left" | "right";
}) {
  const flip = align === "right" ? "flex-row-reverse" : "flex-row";
  const textAlign = align === "right" ? "text-right" : "text-left";
  return (
    <div className={`flex items-center gap-4 ${flip}`}>
      <ClipCard src={clip.src} poster={clip.poster} tilt={clip.tilt} />
      <p
        className={`flex-1 font-mono text-[12px] leading-snug text-ink-dim ${textAlign}`}
      >
        {clip.caption}
      </p>
    </div>
  );
}

function ClipCard({
  src,
  poster,
  tilt,
}: {
  src: string;
  poster: string;
  tilt: string;
}) {
  return (
    <div
      className={`w-24 shrink-0 overflow-hidden rounded-xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-rail-strong sm:w-28 ${tilt}`}
    >
      <VideoPlayer
        src={src}
        poster={poster}
        sectionId={SECTION_ID}
        className="aspect-[9/16] h-full w-full object-cover"
      />
    </div>
  );
}

function ShortformSocials() {
  return (
    <aside className="absolute right-4 bottom-32 z-[5] flex max-w-[8rem] flex-col gap-2 text-right font-mono text-[10px] leading-snug text-ink-dim sm:right-16 sm:bottom-36 sm:max-w-[10rem] sm:text-[11px]">
      <div>
        <p className="tracking-widest text-ink-mute uppercase">
          old travel vlogs
        </p>
        <a
          href="https://tiktok.com/@namishkaistha"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline decoration-rail-strong underline-offset-4 hover:decoration-accent"
        >
          @namishkaistha
        </a>
      </div>
      <div>
        <p className="tracking-widest text-ink-mute uppercase">new</p>
        <a
          href="https://tiktok.com/@namyaps"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-ink underline decoration-rail-strong underline-offset-4 hover:decoration-accent"
        >
          @namyaps <span className="text-ink-mute">tt</span>
        </a>
        <a
          href="https://instagram.com/nam_yaps"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-ink underline decoration-rail-strong underline-offset-4 hover:decoration-accent"
        >
          @nam_yaps <span className="text-ink-mute">ig</span>
        </a>
      </div>
    </aside>
  );
}

function InterestingNotes() {
  return (
    <aside className="absolute top-14 right-4 z-[5] max-w-[9.5rem] rounded-xl border border-rail bg-black/60 p-2.5 backdrop-blur-sm sm:top-16 sm:right-16 sm:max-w-[15rem] sm:p-3">
      <p className="mb-1.5 font-mono text-[9px] tracking-widest text-ink-mute uppercase sm:text-[10px]">
        some things you might find interesting
      </p>
      <ul className="flex flex-col gap-1.5 text-[10px] leading-snug text-ink-dim sm:text-[11px]">
        {NOTES.map((note, index) => (
          <li key={index} className="flex gap-1.5">
            <span className="text-accent">·</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
