const EMAIL = "namishkaistha@gmail.com";

type ContactLink = {
  label: string;
  handle: string;
  href: string;
  isExternal: boolean;
};

const LINKS: readonly ContactLink[] = [
  { label: "email", handle: EMAIL, href: `mailto:${EMAIL}`, isExternal: false },
  {
    label: "linkedin",
    handle: "in/namishkaistha",
    href: "https://linkedin.com/in/namishkaistha",
    isExternal: true,
  },
  {
    label: "github",
    handle: "namishkaistha",
    href: "https://github.com/namishkaistha",
    isExternal: true,
  },
  {
    label: "instagram",
    handle: "@namishkaistha",
    href: "https://instagram.com/namishkaistha",
    isExternal: true,
  },
  {
    label: "tiktok",
    handle: "@namyaps",
    href: "https://tiktok.com/@namyaps",
    isExternal: true,
  },
  {
    label: "substack",
    handle: "namishkaistha",
    href: "https://namishkaistha.substack.com/?utm_campaign=profile_chips",
    isExternal: true,
  },
];

export function Connect() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 px-5 pt-16 pb-24 sm:px-10">
      <ConnectHeader />
      <ul className="mx-auto flex w-full max-w-md flex-col sm:mx-0">
        {LINKS.map((link) => (
          <ContactRow key={link.label} link={link} />
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

function ContactRow({ link }: { link: ContactLink }) {
  const externalProps = link.isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <li className="border-b border-rail first:border-t">
      <a
        href={link.href}
        {...externalProps}
        className="group flex items-baseline justify-between gap-4 py-4 transition hover:pl-2"
      >
        <span className="font-mono text-[11px] tracking-widest text-ink-mute uppercase">
          {link.label}
        </span>
        <span className="flex items-baseline gap-2 text-sm text-ink">
          <span className="underline decoration-rail-strong underline-offset-4 group-hover:decoration-accent">
            {link.handle}
          </span>
          <span aria-hidden className="text-ink-mute transition group-hover:text-accent">
            ↗
          </span>
        </span>
      </a>
    </li>
  );
}
