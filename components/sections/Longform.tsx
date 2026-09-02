import Image from "next/image";
import Link from "next/link";
import { VideoPlayer } from "../VideoPlayer";
import alchemyCover from "@/assets/project-alchemy.png";

const SECTION_ID = "longform";

const PODCAST_URL =
  "http://open.spotify.com/show/4JDEKnaNhWAL0ceZmZ7dsx?si=NLuzfMvCSdmBXYYxeD0PxQ";

const GUESTS = [
  {
    src: "/videos/simran.web.mp4",
    poster: "/videos/simran.jpg",
    name: "Simran Kaur",
    tag: "Founder of Girls That Invest",
    quote:
      "our views on money are largely shaped by the experiences we've had growing up... all you have to do is tap into that to then go well, maybe money ISN'T evil, maybe I can have a growth mindset.",
    episodeUrl:
      "https://open.spotify.com/episode/2nhhcyIme7R1btcl8NLIi2?si=31Et0_XmSWSvIuqWVARyJQ",
    tilt: "-rotate-3",
  },
  {
    src: "/videos/michael.web.mp4",
    poster: "/videos/michael.jpg",
    name: "Michael Bungay Stanier",
    tag: "Author of The Coaching Habit",
    quote:
      "whatever you think your business is at the start, it's not that at the end... you're looking for something you like doing, something you're good at doing, and something the market will pay you for.",
    episodeUrl:
      "https://open.spotify.com/episode/3G2DaPsLhxJrzJzKh9qSBx?si=ONCrqn31QgOvCfsBkrkLxw",
    tilt: "rotate-2",
  },
  {
    src: "/videos/sameer.web.mp4",
    poster: "/videos/sameer.jpg",
    name: "Sameer Gadhia",
    tag: "Young the Giant",
    quote:
      "I know a ton of kids in their late 20s and early 30s who are trying to convince themselves that they love this job they HATE… and it's just paying the bills.",
    episodeUrl:
      "https://open.spotify.com/episode/64D9J2tXN20KBrfGOsOto7?si=4eQLNHt4RFibntLefgHAvw",
    tilt: "-rotate-2",
  },
] as const;

const NOTES = [
  "I recorded, produced, and marketed over 200 of these interviews (a data-loss issue means some aren't on Spotify anymore).",
  "My cofounder and I regularly worked on creative and brand strategy - we executed a rebrand of our show from 5AM Hustle to Project Alchemy.",
  "Now, I know how to cut to the root of a conversation and ask the right questions.",
];

export function Longform() {
  return (
    <div className="relative flex h-full w-full flex-col gap-2 px-5 pt-14 pb-6 sm:px-10">
      <LongformHeader />
      <GuestScatter />
      <LongformMeta />
      <InterestingNotes />
    </div>
  );
}

function LongformHeader() {
  return (
    <div className="flex max-w-2xl flex-col gap-2 pr-40 sm:pr-64">
      <h2 className="font-display text-4xl leading-none font-bold tracking-tight text-ink sm:text-5xl">
        longform.
      </h2>
      <p className="text-[13px] leading-relaxed text-ink-dim sm:text-sm">
        The{" "}
        <Link
          href={PODCAST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline decoration-rail-strong underline-offset-4 hover:decoration-accent"
        >
          Project Alchemy Podcast
        </Link>{" "}
        was mine and a friend&rsquo;s excuse to learn from entrepreneurs
        and creatives we wanted to emulate. Along the way, we recorded over
        200 episodes and crystallized our mission: to empower young people to
        pursue the &ldquo;unconventional&rdquo; path.
      </p>
    </div>
  );
}

function GuestScatter() {
  return (
    <div className="relative mx-auto mt-2 flex w-full max-w-md flex-1 flex-col justify-start gap-5 sm:gap-6">
      <GuestRow guest={GUESTS[0]} align="left" />
      <GuestRow guest={GUESTS[1]} align="right" />
      <GuestRow guest={GUESTS[2]} align="left" />
    </div>
  );
}

function GuestRow({
  guest,
  align,
}: {
  guest: (typeof GUESTS)[number];
  align: "left" | "right";
}) {
  const flip = align === "right" ? "flex-row-reverse" : "flex-row";
  const textAlign = align === "right" ? "text-right" : "text-left";
  return (
    <div className={`flex items-start gap-4 ${flip}`}>
      <GuestCard
        src={guest.src}
        poster={guest.poster}
        tilt={guest.tilt}
        name={guest.name}
      />
      <div className={`flex flex-1 flex-col gap-1 ${textAlign}`}>
        <p className="font-mono text-[10px] leading-tight tracking-widest text-ink-mute uppercase">
          favorite quote · <span className="text-ink">{guest.name}</span>{" "}
          <span className="normal-case tracking-normal text-ink-dim">
            ({guest.tag})
          </span>
        </p>
        <p className="text-[12px] leading-snug text-ink-dim">{guest.quote}</p>
        <a
          href={guest.episodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] tracking-widest text-ink uppercase underline decoration-rail-strong underline-offset-4 hover:decoration-accent"
        >
          full episode →
        </a>
      </div>
    </div>
  );
}

function GuestCard({
  src,
  poster,
  tilt,
  name,
}: {
  src: string;
  poster: string;
  tilt: string;
  name: string;
}) {
  return (
    <figure
      className={`flex w-20 shrink-0 flex-col gap-1 sm:w-20 ${tilt}`}
    >
      <div className="overflow-hidden rounded-xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-rail-strong">
        <VideoPlayer
          src={src}
          poster={poster}
          sectionId={SECTION_ID}
          className="aspect-[9/16] h-full w-full object-cover"
        />
      </div>
      <figcaption className="text-center font-mono text-[9px] tracking-widest text-ink-mute uppercase">
        the guest · {name.split(" ")[0].toLowerCase()}
      </figcaption>
    </figure>
  );
}

function LongformMeta() {
  return (
    <aside className="absolute right-4 bottom-32 z-[5] flex max-w-[8rem] flex-col items-end gap-2 text-right font-mono text-[10px] leading-snug text-ink-dim sm:right-16 sm:bottom-36 sm:max-w-[10rem] sm:text-[11px]">
      <Image
        src={alchemyCover}
        alt="Project Alchemy podcast cover"
        placeholder="blur"
        className="h-14 w-14 rounded-md object-cover ring-1 ring-rail-strong"
        sizes="56px"
      />
      <div>
        <p className="tracking-widest text-ink-mute uppercase">listen</p>
        <a
          href={PODCAST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline decoration-rail-strong underline-offset-4 hover:decoration-accent"
        >
          project alchemy <span className="text-ink-mute">spotify</span>
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
