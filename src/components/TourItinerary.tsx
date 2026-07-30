import type { ItineraryStop } from "@/lib/tours-static";

export function TourItinerary({
  title,
  stops,
}: {
  title: string;
  stops: ItineraryStop[];
}) {
  if (stops.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="font-serif text-2xl text-navy">{title}</h2>
      <ol className="relative mt-6">
        {stops.map((stop, index) => {
          const isLast = index === stops.length - 1;
          return (
            <li
              key={`${stop.title}-${index}`}
              className="relative flex gap-3.5 pb-6 last:pb-0"
            >
              {!isLast && (
                <span
                  className="absolute top-3 left-[5px] h-[calc(100%-0.35rem)] w-px bg-stone-300"
                  aria-hidden
                />
              )}
              <span
                className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-navy/80 ring-4 ring-cream"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="font-semibold text-navy">{stop.title}</p>
                {stop.detail ? (
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">
                    {stop.detail}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
