import { getAnnouncements } from '@/lib/strapi';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haberler — İKLEV',
  description: 'İzmir Karşıyaka Lisesi Eğitim Vakfı duyuru ve haberleri.',
};

interface Announcement {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
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

export default async function HaberlerPage() {
  const res = (await getAnnouncements()) as { data: Announcement[] };
  const announcements = res?.data ?? [];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Başlık bandı */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-4">
            <a href="/" className="hover:text-stone-600 transition-colors">Ana Sayfa</a>
            <span>/</span>
            <span className="text-stone-600">Haberler</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">Haberler & Duyurular</h1>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {announcements.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <GraduationCap size={40} className="mx-auto mb-4 opacity-30" />
            <p>Henüz duyuru bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <Link
                key={announcement.id}
                href={`/haberler/${announcement.slug}`}
                className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-green-200 hover:shadow-md transition-all"
              >
                {/* Kapak görseli */}
                <div className="aspect-video bg-stone-100 overflow-hidden relative">
                  {announcement.coverImage ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${announcement.coverImage.url}`}
                      alt={announcement.coverImage.alternativeText ?? announcement.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-green-50 to-stone-100">
                      <GraduationCap size={32} className="text-stone-300" />
                    </div>
                  )}
                </div>

                {/* İçerik */}
                <div className="p-5">
                  <time className="text-xs text-stone-400 mb-2 block">
                    {formatDate(announcement.publishedAt)}
                  </time>
                  <h2 className="font-semibold text-stone-800 mb-2 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                    {announcement.title}
                  </h2>
                  <p className="text-sm text-stone-500 leading-relaxed line-clamp-3 mb-4">
                    {announcement.summary}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium">
                    Devamını Oku <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}