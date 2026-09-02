type Props = {
  label: string;
  className?: string;
  aspect?: "vertical" | "square" | "hero";
};

const ASPECT_CLASS: Record<NonNullable<Props["aspect"]>, string> = {
  vertical: "aspect-[9/16]",
  square: "aspect-square",
  hero: "",
};

export function AssetPlaceholder({
  label,
  className = "",
  aspect = "hero",
}: Props) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent ring-1 ring-rail ${ASPECT_CLASS[aspect]} ${className}`}
    >
      <span className="font-mono text-[10px] tracking-widest text-ink-mute uppercase">
        {label}
      </span>
    </div>
  );
}
