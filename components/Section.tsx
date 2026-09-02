import { HeartButton } from "./HeartButton";

type Props = {
  id: string;
  number: number;
  total: number;
  label: string;
  children: React.ReactNode;
};

export function Section({ id, number, total, label, children }: Props) {
  return (
    <section
      id={id}
      data-section={id}
      aria-label={label}
      className="relative h-[100dvh] w-screen snap-start snap-always overflow-hidden"
    >
      {children}
      <SectionCorner number={number} total={total} label={label} />
      <HeartButton sectionId={id} />
    </section>
  );
}

function SectionCorner({
  number,
  total,
  label,
}: {
  number: number;
  total: number;
  label: string;
}) {
  return (
    <div className="pointer-events-none absolute top-5 left-5 flex items-center gap-2 font-mono text-[11px] tracking-widest text-ink-mute uppercase">
      <span className="tabular-nums">
        {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span className="h-px w-6 bg-rail-strong" />
      <span>{label}</span>
    </div>
  );
}
