import Image from "next/image";
import { VideoPlayer } from "../VideoPlayer";
import songwritingPhoto from "@/assets/songwriting.jpg";

const SECTION_ID = "fun";

const SPOTIFY_URL =
  "https://open.spotify.com/user/namishkaistha?si=b64903c296d542d9";

type FunItem = {
  key: string;
  caption: string;
  href?: string;
  tilt: string;
  media: "dj" | "songwriting" | "spotify";
};

const ITEMS: FunItem[] = [
  {
    key: "dj",
    caption: "I DJ my friends' parties.",
    tilt: "-rotate-3",
    media: "dj",
  },
  {
    key: "songwriting",
    caption: "I write music (don't look me up on SoundCloud).",
    tilt: "rotate-2",
    media: "songwriting",
  },
  {
    key: "spotify",
    caption: "I curate my Spotify playlists meticulously.",
    href: SPOTIFY_URL,
    tilt: "-rotate-2",
    media: "spotify",
  },
];

export function Fun() {
  return (
    <div className="relative flex h-full w-full flex-col gap-2 px-5 pt-14 pb-6 sm:px-10">
      <FunHeader />
      <FunScatter />
    </div>
  );
}

function FunHeader() {
  return (
    <div className="flex max-w-2xl flex-col gap-1">
      <h2 className="font-display text-4xl leading-none font-bold tracking-tight text-ink sm:text-5xl">
        how I&rsquo;m creative for fun.
      </h2>
      <p className="font-mono text-[11px] tracking-widest text-ink-mute uppercase">
        music!
      </p>
    </div>
  );
}

function FunScatter() {
  return (
    <div className="relative mx-auto mt-2 flex w-full max-w-md flex-1 flex-col justify-start gap-5 sm:gap-6">
      <ItemRow item={ITEMS[0]} align="left" />
      <ItemRow item={ITEMS[1]} align="right" />
      <ItemRow item={ITEMS[2]} align="left" />
    </div>
  );
}

function ItemRow({
  item,
  align,
}: {
  item: FunItem;
  align: "left" | "right";
}) {
  const flip = align === "right" ? "flex-row-reverse" : "flex-row";
  const textAlign = align === "right" ? "text-right" : "text-left";
  return (
    <div className={`flex items-center gap-4 ${flip}`}>
      <ItemCard media={item.media} tilt={item.tilt} />
      <p
        className={`flex-1 font-mono text-[12px] leading-snug text-ink-dim ${textAlign}`}
      >
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-rail-strong underline-offset-4 hover:decoration-accent"
          >
            {item.caption}
          </a>
        ) : (
          item.caption
        )}
      </p>
    </div>
  );
}

function ItemCard({
  media,
  tilt,
}: {
  media: FunItem["media"];
  tilt: string;
}) {
  const frame = `w-20 shrink-0 overflow-hidden rounded-xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-rail-strong sm:w-24 ${tilt}`;

  if (media === "spotify") {
    return (
      <a
        href={SPOTIFY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={frame}
      >
        <SpotifyTile />
      </a>
    );
  }

  if (media === "dj") {
    return (
      <div className={frame}>
        <VideoPlayer
          src="/videos/dj.web.mp4"
          poster="/videos/dj.jpg"
          sectionId={SECTION_ID}
          className="aspect-[9/16] h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={songwritingPhoto}
        alt="Songwriting"
        placeholder="blur"
        className="aspect-[9/16] h-full w-full object-cover"
        sizes="(min-width: 640px) 96px, 80px"
      />
    </div>
  );
}

function SpotifyTile() {
  return (
    <div className="flex aspect-[9/16] h-full w-full flex-col items-center justify-center gap-2 bg-[#1DB954] text-black">
      <SpotifyMark />
      <span className="font-mono text-[9px] tracking-widest uppercase">
        spotify
      </span>
    </div>
  );
}

function SpotifyMark() {
  return (
    <svg
      viewBox="0 0 168 168"
      aria-hidden
      className="h-8 w-8 fill-black"
    >
      <path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 0 1-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 0 1-6.249-3.93 5.213 5.213 0 0 1 3.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 0 1 4.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 0 1 5.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 0 1 2.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z" />
    </svg>
  );
}
