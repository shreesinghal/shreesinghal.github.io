'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Project } from '@/content/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;
  const detailHref = `/projects/${project.id}/`;
  const hasCode = Boolean(project.codeUrl && project.codeUrl !== '#');
  const hasLive = Boolean(project.liveUrl && project.liveUrl !== '#');

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-rule bg-bg transition-colors hover:border-accent/40">
      <Link
        href={detailHref}
        aria-label={`${project.title} — view project details`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View project details</span>
      </Link>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-accent-soft/70">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.imageAlt ?? project.title}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-base italic text-ink-muted"
          >
            {project.title}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-xl font-medium text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-[8] text-sm leading-relaxed text-ink-muted">
          {project.overview}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-rule bg-bg px-2.5 py-0.5 text-xs text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-5 border-t border-rule/60 pt-4 text-sm font-medium">
          <div className="flex items-center gap-5">
            {hasCode && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} — source code (opens in a new tab)`}
                className="relative z-20 text-ink hover:text-accent"
                onClick={(e) => e.stopPropagation()}
              >
                Code
                <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            )}
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} — ${project.liveLabel ?? 'live demo'} (opens in a new tab)`}
                className="relative z-20 text-ink hover:text-accent"
                onClick={(e) => e.stopPropagation()}
              >
                {project.liveLabel ?? 'Live'}
                <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            )}
            {project.paperPdf && (
              <a
                href={project.paperPdf}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} — open paper (PDF) in a new tab`}
                className="relative z-20 text-ink hover:text-accent"
                onClick={(e) => e.stopPropagation()}
              >
                {project.paperLabel ?? 'Paper'}
                <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            )}
          </div>

          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 text-ink-muted transition-colors group-hover:text-accent"
          >
            Details
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
