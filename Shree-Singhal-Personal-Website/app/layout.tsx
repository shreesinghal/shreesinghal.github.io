import type { Metadata } from 'next';
import { Spectral, Inter } from 'next/font/google';
import { site } from '@/content/site';
import 'katex/dist/katex.min.css';
import './globals.css';

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: site.meta.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: site.meta.title,
    description: site.meta.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
