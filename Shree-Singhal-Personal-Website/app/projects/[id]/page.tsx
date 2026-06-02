import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Contact from '@/components/Contact';
import Reveal from '@/components/Reveal';
import PaperViewer from '@/components/PaperViewer';
import { projects, getProjectById } from '@/content/projects';
import { site } from '@/content/site';

type Params = { id: string };

export async function generateStaticParams(): Promise<Params[]> {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getProjectById(params.id);
  if (!project) return { title: site.meta.title };
  const title = `${project.title} — ${site.name}`;
  return {
    title,
    description: project.summary ?? project.overview,
  };
}

export default function ProjectDetailPage({ params }: { params: Params }) {
  const project = getProjectById(params.id);
  if (!project) notFound();

  const hasExternalCode = project.codeUrl && project.codeUrl !== '#';
  const hasExternalLive = project.liveUrl && project.liveUrl !== '#';
  const hasPaper = Boolean(project.paperPdf);
  const hasBodyContent = Boolean(
    project.summary || (project.sections && project.sections.length > 0),
  );

  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto px-6 pb-24 pt-16 md:px-24 md:pt-24">
          <Reveal>
            <a
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
            >
              <span aria-hidden="true">←</span>
              Back to projects
            </a>

            <header className="mt-6 border-b border-rule/60 pb-8 md:mt-8 md:pb-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Project
              </p>
              <h1
                className="mt-4 font-serif font-medium leading-tight text-ink"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
              >
                {project.title}
              </h1>

              {project.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-rule bg-bg px-2.5 py-0.5 text-xs text-ink-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {(hasExternalCode || hasExternalLive || hasPaper) && (
                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-medium">
                  {hasExternalCode && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.title} - source code`}
                      className="text-ink hover:text-accent"
                    >
                      Code
                      <span aria-hidden="true" className="ml-1">↗</span>
                    </a>
                  )}
                  {hasExternalLive && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.title} — ${project.liveLabel ?? 'live demo'}`}
                      className="text-ink hover:text-accent"
                    >
                      {project.liveLabel ?? 'Live'}
                      <span aria-hidden="true" className="ml-1">↗</span>
                    </a>
                  )}
                  {hasPaper && (
                    <a
                      href={project.paperPdf}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.title} — open paper (PDF)`}
                      className="text-ink hover:text-accent"
                    >
                      {project.paperLabel ?? 'Paper'}
                      <span aria-hidden="true" className="ml-1">↗</span>
                    </a>
                  )}
                </div>
              )}
            </header>
          </Reveal>

          {project.summary && (
            <Reveal>
              <p className="mt-10 font-serif text-lg leading-relaxed text-ink md:text-xl">
                {project.summary}
              </p>
            </Reveal>
          )}

          {hasBodyContent && (
            <Reveal>
              <section className="mt-10" aria-labelledby="proj-overview">
                <h2
                  id="proj-overview"
                  className="font-serif text-xl font-medium text-ink md:text-2xl"
                >
                  Overview
                </h2>
                <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink">
                  {project.overview}
                </p>
              </section>
            </Reveal>
          )}

          {project.sections?.map((s, i) => (
            <Reveal key={i}>
              <section className="mt-10">
                {s.image ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8">
                    <figure className="overflow-hidden rounded-lg ring-1 ring-rule">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={s.imageAlt ?? s.heading}
                        className="w-full"
                      />
                      {s.imageCaption && (
                        <figcaption className="border-t border-rule/60 bg-bg px-4 py-2 text-xs text-ink-muted">
                          {s.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                    <div>
                      <h2 className="font-serif text-xl font-medium text-ink md:text-2xl">
                        {s.heading}
                      </h2>
                      <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink">
                        {s.body}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-xl font-medium text-ink md:text-2xl">
                      {s.heading}
                    </h2>
                    <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink">
                      {s.body}
                    </p>
                  </>
                )}
              </section>
            </Reveal>
          ))}

          {project.paperPdf && (
            <Reveal>
              <PaperViewer src={project.paperPdf} title={project.title} />
            </Reveal>
          )}

          {project.photos && project.photos.length > 0 && (
            <Reveal>
              <section className="mt-12" aria-labelledby="proj-photos">
                <h2
                  id="proj-photos"
                  className="font-serif text-xl font-medium text-ink md:text-2xl"
                >
                  Photos
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {project.photos.map((p, i) => (
                    <div key={i} className="overflow-hidden rounded-lg ring-1 ring-rule">
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
                    </div>
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
