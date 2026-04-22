import { getAnnouncementBySlug, getAnnouncements } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { getStrapiMedia } from '@/lib/strapi';


interface Announcement {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  content: object[];
  coverImage?: {
    url: string;
    alternativeText?: string;
  };
}


function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateStaticParams() {
  try {
    const res = await getAnnouncements();
    const announcements = (res as { data: { slug: string }[] }).data ?? [];
    return announcements.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = (await getAnnouncementBySlug(slug)) as { data: Announcement[] };
  const announcement = res?.data?.[0];
  return {
    title: announcement ? `${announcement.title} — İKLEV` : 'Haber — İKLEV',
    description: announcement?.summary,
  };
}

export default async function HaberDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = (await getAnnouncementBySlug(slug)) as { data: Announcement[] };
  const announcement = res?.data?.[0];

  if (!announcement) notFound();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Kapak görseli */}
      {announcement.coverImage && (
        <div className="w-full aspect-21/6 relative overflow-hidden bg-stone-200">
          <Image
            src={getStrapiMedia(announcement.coverImage.url)}
            alt={announcement.coverImage.alternativeText ?? announcement.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Geri butonu */}
        <Link
          href="/haberler"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Tüm Haberler
        </Link>

        {/* Başlık */}
        <div className="mb-8">
          <time className="text-xs text-stone-400 mb-3 block">
            {formatDate(announcement.publishedAt)}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4">
            {announcement.title}
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed border-l-4 border-green-200 pl-4">
            {announcement.summary}
          </p>
        </div>

        {/* İçerik */}
        <div className="bg-white rounded-xl border border-stone-200 p-8 md:p-12">
          <div className="prose prose-stone max-w-none
            prose-headings:font-bold prose-headings:text-stone-900
            prose-p:text-stone-600 prose-p:leading-relaxed
            prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-stone-800
            prose-ul:text-stone-600 prose-ol:text-stone-600">
            <BlocksRenderer
              content={announcement.content as Parameters<typeof BlocksRenderer>[0]['content']}
            />
          </div>
        </div>

        {/* Alt navigasyon */}
        <div className="mt-8 pt-6 border-t border-stone-200">
          <Link
            href="/haberler"
            className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            Tüm Haberlere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}