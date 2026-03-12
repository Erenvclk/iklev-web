'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  Newspaper,
  Mail,
  Users,
  School,
  ChevronDown,
  X,
  Menu,
} from 'lucide-react';

const navItems = [
  { label: 'Anasayfa', href: '/', icon: Home },
  {
    label: 'Vakfımız',
    icon: BookOpen,
    children: [
      { label: 'Tarihçesi', href: '/vakfimiz/tarihcesi', external: false },
      { label: 'Yönetim Kurulları', href: '/vakfimiz/yonetim-kurullari', external: false },
      { label: 'Vakıf Senedi', href: '/vakfimiz/vakif-senedi', external: false },
    ],
  },
  {
    label: 'Burslar',
    icon: GraduationCap,
    children: [
      { label: 'Bursiyer Başvuru', href: '/burslar/basvuru', external: false },
      { label: 'Burs Yönetmeliği', href: '/burslar/yonetmeligi', external: false },
    ],
  },
  {
    label: 'Karşıyaka Lisesi',
    icon: School,
    children: [
      { label: 'Resmi Sitesi', href: 'http://ikl.meb.k12.tr/', external: true },
      {
        label: 'Mezunlar',
        href: 'https://docs.google.com/document/d/1NE251j4J-G-wIJ1pDAZfwObor4aMrVKu/edit',
        external: true,
      },
    ],
  },
  { label: 'Haberler', href: '/haberler', icon: Newspaper },
  { label: 'İletişim', href: '/iletisim', icon: Mail },
  { label: 'Üyelik', href: '/uyelik', icon: Users },
];

const mobileNav = [
  { label: 'Ana', href: '/', icon: Home },
  { label: 'Vakıf', href: '/vakfimiz/tarihcesi', icon: BookOpen },
  { label: 'Burslar', href: '/burslar/basvuru', icon: GraduationCap },
  { label: 'Haberler', href: '/haberler', icon: Newspaper },
  { label: 'İletişim', href: '/iletisim', icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children: { href: string }[]) =>
    children.some((c) => !c.href.startsWith('http') && pathname.startsWith(c.href));

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="İKLEV Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold tracking-widest text-green-700 uppercase">
                  İKLEV
                </span>
                <span className="block text-[10px] text-stone-400 tracking-wide">
                  Karşıyaka Lisesi Eğitim Vakfı
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isParentActive(item.children)
                          ? 'text-green-700 bg-green-50'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openDropdown === item.label && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenDropdown(null)}
                        />
                        <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-20">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              target={child.external ? '_blank' : undefined}
                              rel={child.external ? 'noopener noreferrer' : undefined}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                !child.external && isActive(child.href)
                                  ? 'text-green-700 bg-green-50 font-medium'
                                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href!)
                        ? 'text-green-700 bg-green-50'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* ── MOBİL ÜST BAR ── */}
      <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="İKLEV" fill className="object-contain" />
            </div>
            <span className="text-sm font-bold tracking-widest text-green-700 uppercase">
              İKLEV
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-stone-600 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-stone-200 shadow-lg z-50">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="px-4 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileMenuOpen(false)}
                      target={child.external ? '_blank' : undefined}
                      rel={child.external ? 'noopener noreferrer' : undefined}
                      className={`block px-6 py-2.5 text-sm border-l-2 mx-4 mb-1 rounded-r-md transition-colors ${
                        !child.external && isActive(child.href)
                          ? 'border-green-700 text-green-700 bg-green-50'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium border-b border-stone-100 transition-colors ${
                    isActive(item.href!)
                      ? 'text-green-700 bg-green-50'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </header>

      {/* ── MOBİL ALT NAV BAR ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200">
        <div className="flex items-stretch">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors relative ${
                  active ? 'text-green-700' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.75} />
                <span>{item.label}</span>
                {active && (
                  <span className="absolute bottom-0 w-8 h-0.5 bg-green-700 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="md:hidden h-16" aria-hidden />
    </>
  );
}