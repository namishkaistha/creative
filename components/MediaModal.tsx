"use client";

import { createContext, useContext, useEffect, useState } from "react";

type MediaItem =
  | { type: "video"; src: string; poster?: string; alt?: string }
  | { type: "image"; src: string; alt?: string };

type MediaModalContextValue = { open: (item: MediaItem) => void };

const MediaModalContext = createContext<MediaModalContextValue>({
  open: () => {},
});

export function useMediaModal() {
  return useContext(MediaModalContext);
}

export function MediaModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [item, setItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (!item) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setItem(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  return (
    <MediaModalContext.Provider value={{ open: setItem }}>
      {children}
      {item && <ModalOverlay item={item} onClose={() => setItem(null)} />}
    </MediaModalContext.Provider>
  );
}

function ModalOverlay({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
    >
      <CloseButton onClose={onClose} />
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-full max-w-full items-center justify-center"
      >
        <MediaFrame item={item} />
      </div>
    </div>
  );
}

function MediaFrame({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        playsInline
        className="max-h-[85vh] max-w-[95vw] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt ?? ""}
      className="max-h-[85vh] max-w-[95vw] rounded-2xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    />
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-rail bg-black/60 text-lg text-ink transition hover:bg-black"
    >
      ×
    </button>
  );
}
