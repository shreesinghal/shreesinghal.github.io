import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import katex from 'katex';
import Nav from '@/components/Nav';
import Contact from '@/components/Contact';
import Reveal from '@/components/Reveal';
import PaperViewer from '@/components/PaperViewer';
import Slideshow from '@/components/Slideshow';
import { projects, getProjectById, type ProjectBodyBlock } from '@/content/projects';
import { site } from '@/content/site';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function SectionBody({ body }: { body: string | ProjectBodyBlock[] }) {
  const blocks = Array.isArray(body) ? body : [body];
  return (
    <div className="mt-3 space-y-4 font-serif text-[1.05rem] leading-relaxed text-ink">
      {blocks.map((block, j) => {
        if (typeof block === 'string') {
          return <p key={j}>{block}</p>;
        }
        if ('math' in block) {
          const html = katex.renderToString(block.math, {
            displayMode: true,
            throwOnError: false,
            output: 'html',
          });
          return (
            <div
              key={j}
              className="overflow-x-auto py-1 text-ink"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return (
          <figure key={j} className="my-2">
            <div
              className="overflow-hidden rounded-lg ring-1 ring-rule"
              style={{ height: '80vh' }}
            >
              <iframe
                src={`${block.pdf}#view=FitH&toolbar=1&navpanes=0`}
                title={block.caption ?? 'Embedded PDF'}
                className="h-full w-full"
              />
            </div>
            <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
              <span>{block.caption}</span>
              <a
                href={block.pdf}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-ink transition-colors hover:text-accent"
              >
                Open PDF in a new tab
                <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

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
  const hasPhotos = Boolean(project.photos && project.photos.length > 0);
  const hasSlideshow = Boolean(project.slideshow && project.slideshow.length > 0);

  const toc: { id: string; label: string }[] = [];
  if (hasBodyContent) toc.push({ id: 'proj-overview', label: 'Overview' });
  project.sections?.forEach((s) => {
    if (s.heading && s.heading.trim()) {
      toc.push({ id: slugify(s.heading), label: s.heading });
    }
  });
  if (hasPaper) toc.push({ id: 'proj-paper', label: project.paperLabel ?? 'Paper' });
  if (hasPhotos) toc.push({ id: 'proj-photos', label: 'Photos' });
  if (hasSlideshow) {
    toc.push({
      id: 'proj-slideshow',
      label: project.slideshowHeading ?? 'Gallery',
    });
  }

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

              {toc.length > 1 && (
                <nav
                  aria-label="On this page"
                  className="mt-5 text-xs text-ink-muted"
                >
                  <ul className="flex flex-wrap items-center">
                    <li className="mr-3 font-medium uppercase tracking-[0.2em]">
                      On this page
                    </li>
                    {toc.map((item, idx) => (
                      <li key={item.id} className="flex items-center">
                        {idx > 0 && (
                          <span aria-hidden="true" className="mx-2 text-rule">
                            ·
                          </span>
                        )}
                        <a
                          href={`#${item.id}`}
                          className="transition-colors hover:text-accent"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
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
              <section className="mt-10 scroll-mt-24" aria-labelledby="proj-overview">
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
              <section
                className="mt-10 scroll-mt-24"
                id={s.heading && s.heading.trim() ? slugify(s.heading) : undefined}
              >
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
                      <SectionBody body={s.body} />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-xl font-medium text-ink md:text-2xl">
                      {s.heading}
                    </h2>
                    <SectionBody body={s.body} />
                  </>
                )}
              </section>
            </Reveal>
          ))}

          {project.paperPdf && (
            <Reveal>
              <div id="proj-paper" className="scroll-mt-24">
                <PaperViewer src={project.paperPdf} title={project.title} />
              </div>
            </Reveal>
          )}

          {hasSlideshow && (
            <Reveal>
              <section
                id="proj-slideshow"
                className="mt-12 scroll-mt-24"
                aria-labelledby="proj-slideshow-heading"
              >
                <h2
                  id="proj-slideshow-heading"
                  className="font-serif text-xl font-medium text-ink md:text-2xl"
                >
                  {project.slideshowHeading ?? 'Gallery'}
                </h2>
                <div className="mt-5">
                  <Slideshow images={project.slideshow!} />
                </div>
              </section>
            </Reveal>
          )}

          {project.photos && project.photos.length > 0 && (
            <Reveal>
              <section className="mt-12 scroll-mt-24" aria-labelledby="proj-photos">
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
