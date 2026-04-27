import Link from 'next/link';
import { ArrowRight, GraduationCap, CreditCard } from 'lucide-react';
import { getAnnouncements, getSiteSettings, getHeroSlides } from '@/lib/strapi';
import HeroSlider from '@/components/sections/HeroSlider';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';

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

interface SiteSettings {
  memberCount: number;
  foundedYear: string;
  ibanNo: string;
}

interface HeroSlide {
  id: number;
  order: number;
  alt: string;
  image: { url: string; alternativeText?: string };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function Home() {
  const [announcementsRes, settingsRes, slidesRes] = await Promise.all([
    getAnnouncements(),
    getSiteSettings(),
    getHeroSlides(),
  ]);

  const announcements: Announcement[] =
    (announcementsRes as { data: Announcement[] } | null)?.data?.slice(0, 3) ?? [];
  const settings: SiteSettings =
    (settingsRes as { data: SiteSettings } | null)?.data ?? {} as SiteSettings;
  const slides: HeroSlide[] =
    (slidesRes as { data: HeroSlide[] } | null)?.data ?? [];

  const memberCount = settings.memberCount ?? 200;

  return (
    <div className="min-h-screen">

      {/* ── HERO SLIDER ── */}
      <section className="relative">
        <HeroSlider slides={slides} />

        <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
          <div className="max-w-6xl mx-auto px-6 pb-12 w-full">
            <div className="inline-flex items-center gap-2 bg-green-700/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              {settings.foundedYear ?? '1996'}&apos;dan Bu Yana Aktif
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              İzmir Karşıyaka Lisesi
              <span className="block text-green-300">Eğitim Vakfı</span>
            </h1>
            <div className="flex flex-wrap gap-3 pointer-events-auto">
              <Link
                href="/burslar/basvuru"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm"
              >
                Burs Başvurusu <ArrowRight size={15} />
              </Link>
              <Link
                href="/uyelik"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm border border-white/30"
              >
                Vakfa Destek Ol
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HAKKIMIZDA ── */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">

          {/* Üst başlık */}
          <div className="mb-12">
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3 block">
              Vakfımız Hakkında
            </span>
            <h2 className="text-3xl font-bold text-stone-900 leading-tight">
              İzmir Karşıyaka Lisesi Eğitim Vakfı
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Sol: Açıklama metni */}
            <div>
              <p className="text-stone-600 leading-relaxed mb-4">
                Vakfımız, İzmir&apos;de bulunan üç lise eğitim vakfından biri olarak
                25 Nisan 1996 tarihinden bu yana çalışmalarını sürdürmektedir.
                Bugün itibarıyla {memberCount}&apos;in üzerinde üyeye sahiptir.
              </p>

              {/* Vakıf senedi alıntısı */}
              <blockquote className="border-l-2 border-green-600 pl-5 my-6">
                <p className="text-stone-600 leading-relaxed italic text-sm">
                  &ldquo;İzmir Karşıyaka Lisesi öğrencilerini; özgür düşünce, çağdaş bilim
                  anlayışı ve Atatürk ilkeleri ışığı altında yetiştirme, çalışma, inceleme,
                  araştırma ve yönetim yeteneklerine sahip kılmak. Ülkeye ve insanlığa
                  yararlı aydın kişiler olarak yetişmelerini sağlamaya çalışmak. Lise bina
                  ve eğitim olanaklarının genişletilmesi, onarılması ve artırılmasına
                  katkıda bulunmak… Eğitsel ve kültürel hizmetlere katkı sağlamak.&rdquo;
                </p>
                <footer className="mt-3 text-xs text-stone-400 font-medium uppercase tracking-wide not-italic">
                  Vakıf Senedi
                </footer>
              </blockquote>

              <p className="text-stone-600 leading-relaxed mb-4">
                Amaçlarını gerçekleştirmek için yıllardır çalışmalarını sürdüren vakfımız,
                yetenekli ve çalışkan olduğu halde okuma olanakları sınırlı öğrencilerimize
                her yıl onlarca burs vermektedir. Bunun yanı sıra eski mezunlarımız onuruna
                50. ve 60. yıl tören ve galaları, aramızdan ayrılan ve yaşayan en eski
                öğretmen ve mezunlarımızın anıldığı vefa günleri düzenlemekte; okulumuzun
                ihtiyaçlarını karşılamak için de kesintisiz çalışmaktadır.
              </p>

              <p className="text-stone-600 leading-relaxed mb-6">
                Karşıyaka Liseliler olarak biz varsak ve birlikte olursak vakfımız sonsuza
                kadar yaşayacaktır. Üye olun, bağışlarınızla katkıda bulunun.
              </p>

              <Link
                href="/vakfimiz/tarihcesi"
                className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium text-sm transition-colors"
              >
                Tarihçemizi Okuyun <ArrowRight size={15} />
              </Link>
            </div>

            {/* Sağ: Amaçlar kartı */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
              <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">
                Vakfın Amaçları
              </h3>
              <ul className="space-y-5">
                {[
                  {
                    title: 'Özgür Düşünce ve Çağdaş Eğitim',
                    desc: 'Atatürk ilkeleri ışığında, özgür düşünce ve çağdaş bilim anlayışıyla öğrenci yetiştirmek.',
                  },
                  {
                    title: 'Burs ile Eğitime Erişim',
                    desc: 'Okuma olanakları sınırlı, yetenekli ve çalışkan öğrencilere burs sağlamak.',
                  },
                  {
                    title: 'Okul Olanaklarını Geliştirmek',
                    desc: 'Lise bina ve eğitim olanaklarının genişletilmesi, onarılması ve artırılmasına katkıda bulunmak.',
                  },
                  {
                    title: 'Kültürel ve Eğitsel Hizmetler',
                    desc: 'Yarışmalar, törenler ve vefa günleriyle eğitsel ve kültürel hizmetlere destek sağlamak.',
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-stone-700 mb-0.5">{item.title}</p>
                      <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SON HABERLER ── */}
      <section className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3 block">
                Duyurular
              </span>
              <h2 className="text-3xl font-bold text-stone-900">Son Haberler</h2>
            </div>
            <Link
              href="/haberler"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-green-700 transition-colors font-medium"
            >
              Tümünü Gör <ArrowRight size={15} />
            </Link>
          </div>

          {announcements.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <p>Henüz duyuru bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <Link
                  key={announcement.id}
                  href={`/haberler/${announcement.slug}`}
                  className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-green-200 hover:shadow-md transition-all"
                >
                  <div className="aspect-video bg-stone-100 overflow-hidden relative">
                    {announcement.coverImage ? (
                      <Image
                        src={getStrapiMedia(announcement.coverImage.url)}
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
                  <div className="p-5">
                    <time className="text-xs text-stone-400 mb-2 block">
                      {formatDate(announcement.publishedAt)}
                    </time>
                    <h3 className="font-semibold text-stone-800 mb-2 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
                      {announcement.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6 sm:hidden text-center">
            <Link href="/haberler" className="inline-flex items-center gap-1.5 text-sm text-green-700 font-medium">
              Tüm Haberleri Gör <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BAĞIŞ & DESTEK ── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3 block">
              Destek Olun
            </span>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Vakfa Bağış Yapın
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              Bağışlarınız, öğrencilerimizin eğitim hayallerini gerçekleştirmesine
              doğrudan katkı sağlar.
            </p>

            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 text-left mb-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard size={18} className="text-green-700" />
                <span className="font-semibold text-stone-800">Banka Havalesi</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wide block mb-1">Banka</span>
                  <span className="text-stone-700 font-medium">Halk Bankası Karşıyaka Şubesi</span>
                </div>
                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-wide block mb-1">Şube Kodu</span>
                  <span className="text-stone-700 font-medium">710</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone-400 text-xs uppercase tracking-wide block mb-1">IBAN</span>
                  <span className="text-stone-900 font-mono font-semibold tracking-wide text-base">
                    {settings.ibanNo ?? 'TR40 0001 2009 7100 0016 0000 61'}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/uyelik"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Üye Ol <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}