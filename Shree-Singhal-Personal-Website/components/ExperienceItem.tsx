import Link from 'next/link';
import type { Experience } from '@/content/experience';

export default function ExperienceItem({ entry }: { entry: Experience }) {
  return (
    <li
      id={entry.id}
      className="scroll-mt-0 border-b border-rule/60 last:border-b-0"
    >
      <Link
        href={`/experience/${entry.id}/`}
        aria-label={`${entry.role} at ${entry.company} — view details`}
        className="group grid grid-cols-[64px_1fr] gap-4 py-7 transition-colors md:grid-cols-[80px_1fr] md:gap-6 md:py-9"
      >
        <div
          aria-hidden={entry.logo ? undefined : 'true'}
          className={`h-16 w-16 overflow-hidden rounded-md ring-1 ring-rule transition-colors md:h-20 md:w-20 ${
            entry.logo
              ? 'bg-bg'
              : 'bg-accent-soft/70 group-hover:bg-accent-soft'
          }`}
        >
          {entry.logo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={entry.logo}
              alt={`${entry.company} logo`}
              className="h-full w-full object-contain p-2"
              loading="lazy"
            />
          )}
        </div>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-serif text-xl font-medium text-ink transition-colors group-hover:text-accent md:text-2xl">
              {entry.role}
              <span className="text-ink-muted"> · </span>
              <span className="text-ink-muted">{entry.company}</span>
            </h3>
            <p className="text-sm text-ink-muted">{entry.dates}</p>
          </div>

          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.975rem] leading-relaxed text-ink marker:text-accent">
            {entry.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition-colors group-hover:text-accent"
          >
            View details
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
