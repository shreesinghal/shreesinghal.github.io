'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';

const links = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule/60 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-3 md:px-8">
        <a
          href="/"
          className="font-serif text-lg font-medium tracking-tight text-ink hover:text-accent"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-ink-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative inline-block py-1 transition-colors hover:text-accent
                    after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-accent/10 md:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-rule/60 bg-bg md:hidden ${open ? 'block' : 'hidden'}`}
      >
        <nav aria-label="Mobile">
          <ul className="mx-auto flex max-w-page flex-col px-6 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-ink hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
