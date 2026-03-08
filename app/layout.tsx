// 🔑 Next.js concept: layout.tsx
// Wraps every page. Persists across navigations without re-rendering.
// Ideal for fonts, global styles, and shell structure.

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 🔑 next/font: downloaded at BUILD TIME, self-hosted — no runtime Google request
// 'variable' creates --font-inter CSS var, referenced in globals.css @theme block
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Fallback metadata — page.tsx overrides with dynamic values from timeline.json
export const metadata: Metadata = {
  title: 'Career Timeline — Vigneshwar Pasupathi',
  description: 'A chronological career journey from graduation to present.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
