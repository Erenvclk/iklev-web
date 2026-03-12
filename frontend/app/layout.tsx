import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'İKLEV — İzmir Karşıyaka Lisesi Eğitim Vakfı',
  description: '1996\'dan bu yana Karşıyaka Lisesi öğrencilerine burs veren eğitim vakfı.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans bg-stone-50 text-stone-800`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}