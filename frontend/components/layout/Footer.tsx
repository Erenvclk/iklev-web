import Link from 'next/link';
import { MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import Image from 'next/image';
const footerLinks = {
    Vakfımız: [
        { label: 'Tarihçesi', href: '/vakfimiz/tarihcesi', external: false },
        { label: 'Yönetim Kurulları', href: '/vakfimiz/yonetim-kurullari', external: false },
        { label: 'Vakıf Senedi', href: '/vakfimiz/vakif-senedi', external: false },
    ],
    Burslar: [
        { label: 'Bursiyer Başvuru', href: '/burslar/basvuru', external: false },
        { label: 'Burs Yönetmeliği', href: '/burslar/yonetmeligi', external: false },
    ],
    'Karşıyaka Lisesi': [
        { label: 'Resmi Sitesi', href: 'http://ikl.meb.k12.tr/', external: true },
        {
            label: 'Mezunlar',
            href: 'https://docs.google.com/document/d/1NE251j4J-G-wIJ1pDAZfwObor4aMrVKu/edit',
            external: true,
        },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-stone-800 text-stone-300">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">

                    {/* Sütun 1: Marka + İletişim + Bağış */}
                    <div className="space-y-6">

                        {/* Logo + İletişim */}
                        <div>
                            <Link href="/" className="flex items-center gap-3 mb-4">
                                <div className="relative w-10 h-10 shrink-0">
                                    <Image
                                        src="/images/logo.png"
                                        alt="İKLEV"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <span className="block text-sm font-bold tracking-widest text-white uppercase">
                                        İKLEV
                                    </span>
                                    <span className="block text-[10px] text-stone-400 tracking-wide">
                                        Eğitim Vakfı
                                    </span>
                                </div>
                            </Link>

                            <p className="text-xs text-stone-400 leading-relaxed mb-5">
                                İzmir Karşıyaka Lisesi Eğitim Vakfı — 1996&apos;dan bu yana öğrencilerimize burs veriyor.
                            </p>

                            <div className="space-y-2.5 text-xs">
                                <div className="flex items-start gap-2">
                                    <MapPin size={13} className="text-green-400 mt-0.5 shrink-0" />
                                    <span>Yaşar Aksoy Sokak No:83 D.1, Karşıyaka / İzmir</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={13} className="text-green-400 shrink-0" />
                                    <a href="tel:02323681912" className="hover:text-white transition-colors">
                                        (0232) 368 1912
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={13} className="text-green-400 shrink-0" />
                                    <a href="mailto:info@iklev.org.tr" className="hover:text-white transition-colors">
                                        info@iklev.org.tr
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bağış Bilgisi */}
                        <div>
                            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-3">
                                Bağış & Üyelik
                            </h3>
                            <div className="bg-stone-700/50 rounded-lg p-4 border border-stone-600">
                                <div className="flex items-center gap-2 mb-3">
                                    <CreditCard size={14} className="text-green-400" />
                                    <span className="text-xs font-medium text-white">Banka Havalesi</span>
                                </div>
                                <div className="space-y-1.5 text-xs">
                                    <div>
                                        <span className="text-stone-400">Banka: </span>
                                        <span className="text-stone-200">Halk Bankası Karşıyaka</span>
                                    </div>
                                    <div>
                                        <span className="text-stone-400">Şube: </span>
                                        <span className="text-stone-200">710</span>
                                    </div>
                                    <div className="pt-1">
                                        <span className="text-stone-400 block mb-1">IBAN:</span>
                                        <span className="text-white font-mono text-[11px] tracking-wide">
                                            TR40 0001 2009 7100 0016 0000 61
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href="/uyelik"
                                className="mt-3 block text-center text-xs bg-green-700 hover:bg-blue-600 text-white px-4 py-2.5 rounded-md transition-colors font-medium"
                            >
                                Üye Ol
                            </Link>
                        </div>
                    </div>

                    {/* Sütun 2-4: Nav Linkleri */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                                {title}
                            </h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            target={link.external ? '_blank' : undefined}
                                            rel={link.external ? 'noopener noreferrer' : undefined}
                                            className="text-xs text-stone-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Alt çizgi */}
                <div className="mt-10 pt-6 border-t border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
                    <span>© {new Date().getFullYear()} İKLEV — Tüm hakları saklıdır.</span>
                    <span>İzmir Karşıyaka Lisesi Eğitim Vakfı</span>
                </div>
            </div>
        </footer>
    );
}