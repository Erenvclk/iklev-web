import { getSiteSettings } from '@/lib/strapi';
import { MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim — İKLEV',
  description: 'İzmir Karşıyaka Lisesi Eğitim Vakfı iletişim bilgileri.',
};

interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  ibanNo: string;
}

export default async function IletisimPage() {
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
            <span className="text-stone-600">İletişim</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">İletişim</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">

          {/* İletişim Bilgileri */}
          <div className="bg-white rounded-xl border border-stone-200 p-8">
            <h2 className="text-lg font-semibold text-stone-900 mb-6">İletişim Bilgileri</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-1 font-medium uppercase tracking-wide">Adres</p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {settings.address ?? 'Yaşar Aksoy Sokak No:83 D.1, Karşıyaka / İzmir'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-1 font-medium uppercase tracking-wide">Telefon</p>
                  <a
                    href={`tel:${settings.phone ?? '02323681912'}`}
                    className="text-sm text-stone-700 hover:text-green-700 transition-colors"
                  >
                    {settings.phone ?? '(0232) 368 1912'}
                  </a>
                  <p className="text-xs text-stone-400 mt-1">0532 379 1912 — Vakıf Merkezi</p>
                  <p className="text-xs text-stone-400">0535 302 00 57 — Başkan Prof. Dr. Semih Güneş</p>
                  <p className="text-xs text-stone-400">0532 453 11 88 — Bşk. Yrd. Av. Vehbi Moğol</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-1 font-medium uppercase tracking-wide">E-posta</p>
                  <a
                    href={`mailto:${settings.email ?? 'info@iklev.org.tr'}`}
                    className="text-sm text-stone-700 hover:text-green-700 transition-colors"
                  >
                    {settings.email ?? 'info@iklev.org.tr'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Banka Bilgileri */}
          <div className="bg-white rounded-xl border border-stone-200 p-8">
            <h2 className="text-lg font-semibold text-stone-900 mb-6">Bağış & Üyelik</h2>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <CreditCard size={16} className="text-green-700" />
              </div>
              <div>
                <p className="text-xs text-stone-400 mb-1 font-medium uppercase tracking-wide">Banka Havalesi</p>
                <p className="text-sm text-stone-700">Halk Bankası Karşıyaka Şubesi</p>
                <p className="text-xs text-stone-400 mt-1">Şube Kodu: 710 — Hesap No: 16000061</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
              <p className="text-xs text-stone-400 mb-2 font-medium uppercase tracking-wide">IBAN</p>
              <p className="font-mono font-semibold text-stone-900 tracking-wide">
                {settings.ibanNo ?? 'TR40 0001 2009 7100 0016 0000 61'}
              </p>
            </div>

            <p className="text-xs text-stone-400 mt-4 leading-relaxed">
              Vakfımıza en az yarım Cumhuriyet Altınının Türk Lirası karşılığından az olmamak
              koşuluyla nakit veya ayni bağışta bulunabilirsiniz.
            </p>
          </div>
        </div>

        {/* Harita */}
        <div className="mt-6 bg-white rounded-xl border border-stone-200 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d27.118984899999997!3d38.4632386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbdad9c598e0c1%3A0x81090a0dcd7d05ea!2zWWHFn2FyIEFrc295IFNrLiBObzo4MywgMzU2MDAgS2Fyw59peWFrYS_EsHptaXIsIFTDvHJraXll!5e0!3m2!1str!2str!4v1"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="İKLEV Konum"
          />
        </div>
      </div>
    </div>
  );
}