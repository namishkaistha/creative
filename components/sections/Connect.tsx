import type { ReactNode } from "react";

const EMAIL = "namishkaistha@gmail.com";

type ContactLink = {
  label: string;
  href: string;
  tint: string;
  isExternal: boolean;
  icon: ReactNode;
};

const LINKS: readonly ContactLink[] = [
  {
    label: "Substack",
    href: "https://namishkaistha.substack.com/?utm_campaign=profile_chips",
    tint: "#e2662b",
    isExternal: true,
    icon: (
      <>
        <path d="M5 5h14" />
        <path d="M5 9h14" />
        <path d="M5 13h14v7.5l-7-4.2-7 4.2z" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@namyaps",
    tint: "#fe2c55",
    isExternal: true,
    icon: (
      <>
        <path d="M14 4v10.2a3.6 3.6 0 1 1-3.6-3.6" />
        <path d="M14 4c.3 2.5 2.1 4.1 5 4.3" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/namishkaistha",
    tint: "#d8579a",
    isExternal: true,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/namishkaistha",
    tint: "#5b8fe0",
    isExternal: true,
    icon: (
      <>
        <circle cx="6.5" cy="6.5" r="1.4" />
        <path d="M6.5 10.5V18" />
        <path d="M11 18v-7.5" />
        <path d="M11 13.5c0-2 1.4-3 3-3s3.2 1 3.2 3.4V18" />
      </>
    ),
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    tint: "#e5604f",
    isExternal: false,
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <path d="M3.5 7.5l8.5 6.2 8.5-6.2" />
      </>
    ),
  },
];

export function Connect() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-10 px-5 pt-16 pb-24 sm:px-10">
      <ConnectHeader />
      <ul className="flex flex-wrap gap-5">
        {LINKS.map((link) => (
          <ContactIcon key={link.label} link={link} />
        ))}
      </ul>
    </div>
  );
}

function ConnectHeader() {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <h2 className="font-display text-4xl leading-none font-bold tracking-tight text-ink sm:text-5xl">
        say hi.
      </h2>
      <p className="text-[13px] leading-relaxed text-ink-dim sm:text-sm">
        I&rsquo;m always up to talk about stories, content, building things, or
        music. Pick whichever is easiest for you.
      </p>
    </div>
  );
}

function ContactIcon({ link }: { link: ContactLink }) {
  const externalProps = link.isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <li>
      <a
        href={link.href}
        {...externalProps}
        aria-label={link.label}
        className="group flex w-16 flex-col items-center gap-2"
      >
        <span
          style={{ color: link.tint }}
          className="grid h-14 w-14 place-items-center rounded-full bg-white/[0.06] ring-1 ring-rail-strong transition duration-200 group-hover:-translate-y-1 group-hover:bg-white/[0.12] group-hover:ring-current"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {link.icon}
          </svg>
        </span>
        <span className="font-mono text-[10px] tracking-widest text-ink-mute uppercase">
          {link.label}
        </span>
      </a>
    </li>
  );
}
