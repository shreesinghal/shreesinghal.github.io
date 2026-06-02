import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Contact from '@/components/Contact';
import Reveal from '@/components/Reveal';
import { experience, getExperienceById } from '@/content/experience';
import { site } from '@/content/site';

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return experience.map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const entry = getExperienceById(params.id);
  if (!entry) return { title: site.meta.title };
  const title = `${entry.role} · ${entry.company} — ${site.name}`;
  return {
    title,
    description: entry.summary ?? `${entry.role} at ${entry.company}, ${entry.dates}.`,
  };
}

export default function ExperienceDetailPage({ params }: { params: Params }) {
  const entry = getExperienceById(params.id);
  if (!entry) notFound();

  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto max-w-page px-6 pb-24 pt-16 md:px-24 md:pt-24">
          <Reveal>
            <a
              href="/#experience"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
            >
              <span aria-hidden="true">←</span>
              Back to experience
            </a>

            <header className="mt-6 border-b border-rule/60 pb-8 md:mt-8 md:pb-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Experience
              </p>
              <h1
                className="mt-4 font-serif font-medium leading-tight text-ink"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
              >
                {entry.role}
                <span className="text-ink-muted"> · </span>
                <span className="text-ink-muted">{entry.company}</span>
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                <span>{entry.dates}</span>
                {entry.location && (
                  <>
                    <span aria-hidden="true" className="text-ink-muted/60">·</span>
                    <span>{entry.location}</span>
                  </>
                )}
              </div>
            </header>
          </Reveal>

          {entry.summary && (
            <Reveal>
              <p className="mt-10 max-w-prose font-serif text-lg leading-relaxed text-ink md:text-xl">
                {entry.summary}
              </p>
            </Reveal>
          )}

          <Reveal>
            <section className="mt-10" aria-labelledby="exp-highlights">
              <h2
                id="exp-highlights"
                className="font-serif text-xl font-medium text-ink md:text-2xl"
              >
                Highlights
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.975rem] leading-relaxed text-ink marker:text-accent">
                {entry.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          </Reveal>

          {entry.sections?.map((s, i) => (
            <Reveal key={i}>
              <section className="mt-10">
                <h2 className="font-serif text-xl font-medium text-ink md:text-2xl">
                  {s.heading}
                </h2>
                <p className="mt-3 max-w-prose font-serif text-[1.05rem] leading-relaxed text-ink">
                  {s.body}
                </p>
              </section>
            </Reveal>
          ))}

          {entry.photos && entry.photos.length > 0 && (
            <Reveal>
              <section className="mt-12" aria-labelledby="exp-photos">
                <h2
                  id="exp-photos"
                  className="font-serif text-xl font-medium text-ink md:text-2xl"
                >
                  Photos
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {entry.photos.map((p, i) => (
                    <figure key={i} className="overflow-hidden rounded-lg ring-1 ring-rule">
                      {p.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.src}
                          alt={p.alt}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      ) : (
                        <div
                          role="img"
                          aria-label={p.alt}
                          className="flex aspect-[4/3] w-full items-center justify-center bg-accent-soft/70 font-serif text-sm italic text-ink-muted"
                        >
                          Photo slot
                        </div>
                      )}
                      {p.caption && (
                        <figcaption className="border-t border-rule/60 bg-bg px-4 py-2 text-xs text-ink-muted">
                          {p.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </section>
            </Reveal>
          )}
        </article>
      </main>
      <Contact />
    </>
  );
}
