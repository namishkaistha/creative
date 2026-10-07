import { Suspense } from "react";
import type { SectionId } from "@/lib/sections";
import { DoubleTapToLike } from "./DoubleTapToLike";
import { SectionLike } from "./SectionLike";

type Props = {
  id: SectionId;
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
      className="relative h-[100dvh] w-full touch-manipulation snap-start snap-always overflow-hidden"
    >
      <DoubleTapToLike>
        {children}
        <SectionCorner number={number} total={total} label={label} />
        <div className="absolute right-3 bottom-8 z-10 sm:right-14 sm:bottom-12">
          <Suspense fallback={null}>
            <SectionLike sectionId={id} />
          </Suspense>
        </div>
      </DoubleTapToLike>
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
    <div className="pointer-events-none absolute top-5 left-5 flex items-center gap-2 font-mono text-[0.6875rem] tracking-widest text-ink-mute uppercase">
      <span className="tabular-nums">
        {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span className="h-px w-6 bg-rail-strong" />
      <span>{label}</span>
    </div>
  );
}
