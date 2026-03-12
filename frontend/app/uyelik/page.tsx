import { getSiteSettings } from '@/lib/strapi';
import Link from 'next/link';
import { CheckCircle, CreditCard, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üyelik — İKLEV',
  description: 'İzmir Karşıyaka Lisesi Eğitim Vakfı üyelik bilgileri.',
};

interface SiteSettings {
  ibanNo: string;
}

export default async function UyelikPage() {
  const res = (await getSiteSettings()) as { data: SiteSettings };
  const settings = res?.data ?? {};

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Başlık bandı */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-4">
            <a href="/" className="hover:text-stone-600 transition-colors">Ana Sayfa</a>
            <span>/</span>
            <span className="text-stone-600">Üyelik</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">Üyelik</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">

        {/* Üyelik Hakkında */}
        <div className="bg-white rounded-xl border border-stone-200 p-8">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Üyelik Hakkında</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            Vakfımıza, en az yarım Cumhuriyet Altınının Türk Lirası karşılığından az olmamak
            koşuluyla nakit veya ayni bağışta bulunan Karşıyaka Liselilerin üye olmaları,
            ayni veya nakdi bağışta bulunarak katkı sağlamaları mümkündür.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Vakfımıza üye olun, ayni ya da nakdi yardımlarınızla katkıda bulunun.
            Karşıyaka Liseliler olarak biz varsak ve birlikte olursak vakfımız sonsuza kadar yaşayacaktır.
          </p>
        </div>

        {/* Üyelik Şartları */}
        <div className="bg-white rounded-xl border border-stone-200 p-8">
          <h2 className="text-lg font-semibold text-stone-900 mb-6">Üyelik Şartları</h2>
          <ul className="space-y-4">
            {[
              'Karşıyaka Lisesi mezunu veya öğrencisi olmak',
              'En az yarım Cumhuriyet Altını karşılığı nakit veya ayni bağış yapmak',
              'Vakfın amaç ve ilkelerini benimsemek',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-700 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-600 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nasıl Üye Olunur */}
        <div className="bg-white rounded-xl border border-stone-200 p-8">
          <h2 className="text-lg font-semibold text-stone-900 mb-6">Nasıl Üye Olunur?</h2>

          <div className="space-y-4 mb-8">
            {[
              { step: '1', title: 'Bağış Yapın', desc: 'Aşağıdaki banka hesabına bağış yapın.' },
              { step: '2', title: 'İletişime Geçin', desc: 'Dekontunuzla birlikte vakfımızla iletişime geçin.' },
              { step: '3', title: 'Üyeliğiniz Onaylanır', desc: 'Vakıf yönetimi üyeliğinizi onaylar ve size bilgi verir.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{item.title}</p>
                  <p className="text-sm text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Banka Bilgisi */}
          <div className="bg-stone-50 rounded-lg p-5 border border-stone-200">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={16} className="text-green-700" />
              <span className="text-sm font-semibold text-stone-800">Banka Havalesi</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <span className="text-xs text-stone-400 uppercase tracking-wide block mb-1">Banka</span>
                <span className="text-stone-700 font-medium">Halk Bankası Karşıyaka Şubesi</span>
              </div>
              <div>
                <span className="text-xs text-stone-400 uppercase tracking-wide block mb-1">Şube Kodu</span>
                <span className="text-stone-700 font-medium">710</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs text-stone-400 uppercase tracking-wide block mb-1">IBAN</span>
                <span className="text-stone-900 font-mono font-semibold tracking-wide">
                  {settings.ibanNo ?? 'TR40 0001 2009 7100 0016 0000 61'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim CTA */}
        <div className="bg-green-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Sorularınız mı var?</h2>
          <p className="text-green-200 text-sm mb-5">
            Üyelik hakkında daha fazla bilgi almak için bizimle iletişime geçin.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
          >
            İletişime Geç
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </div>
  );
}