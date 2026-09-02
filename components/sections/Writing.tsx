import Image from "next/image";
import Link from "next/link";
import happinessCover from "@/assets/happiness-thesis.png";

const SUBSTACK_URL =
  "https://namishkaistha.substack.com/p/my-happiness-thesis?r=3uik5y&utm_campaign=post&utm_medium=web";
const ESSAY_TITLE = "My Happiness Thesis";
const ESSAY_EXCERPT =
  "A year ago I was not in a great spot, and now I'm pretty happy. I wrote this substack as a reflection to myself on how I slowly changed my mindset and lifestyle to be a ball of abundance and joy.";

export function Writing() {
  return (
    <div className="relative flex h-full w-full flex-col gap-4 px-5 pt-14 pb-6 sm:px-10">
      <h2 className="font-display text-4xl leading-none font-bold tracking-tight text-ink sm:text-5xl">
        substack.
      </h2>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 sm:gap-6">
        <div className="w-40 overflow-hidden rounded-xl ring-1 ring-rail sm:w-48">
          <Image
            src={happinessCover}
            alt="My Happiness Thesis cover"
            placeholder="blur"
            className="h-auto w-full"
            sizes="(min-width: 640px) 192px, 160px"
          />
        </div>
        <div className="flex max-w-lg flex-col items-center gap-3 text-center">
          <h3 className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-ink sm:text-4xl">
            {ESSAY_TITLE}
          </h3>
          <p className="text-[14px] leading-relaxed text-ink-dim">
            {ESSAY_EXCERPT}
          </p>
        </div>
        <Link
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-accent px-6 py-3 font-mono text-[12px] tracking-widest text-ink uppercase transition-transform hover:scale-[1.02]"
        >
          Read on Substack →
        </Link>
      </div>
    </div>
  );
}
