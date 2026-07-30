"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollCarousel({
  children,
  className = "mt-10",
  gapClassName = "gap-6",
  previousLabel = "Previous",
  nextLabel = "Next",
}: {
  children: ReactNode;
  className?: string;
  gapClassName?: string;
  previousLabel?: string;
  nextLabel?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < maxScroll - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap) || 24;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollerRef}
        className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${gapClassName}`}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label={previousLabel}
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        className="absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-navy shadow-sm transition hover:border-teal hover:text-teal disabled:pointer-events-none disabled:opacity-0"
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        className="absolute top-1/2 right-0 z-10 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-navy shadow-sm transition hover:border-teal hover:text-teal disabled:pointer-events-none disabled:opacity-0"
      >
        <Chevron direction="right" />
      </button>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d={direction === "left" ? "M12 4L6 10l6 6" : "M8 4l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
