import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: 'Overprepared | The ultimate tool for interview preparation.',
  description: 'The ultimate tool for interview preparation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Head>
          <link rel='icon' href='/icon?<generated>' type='image/<generated>' />
        </Head>

        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
