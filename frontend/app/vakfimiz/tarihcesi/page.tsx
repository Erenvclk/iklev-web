import StaticPageTemplate from '@/components/sections/StaticPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarihçemiz — İKLEV',
  description: 'İzmir Karşıyaka Lisesi Eğitim Vakfı tarihçesi.',
};

export const dynamic = 'force-dynamic';

export default function TarihcesiPage() {
  return (
    <StaticPageTemplate
      slug="tarihcesi"
      breadcrumb={[
        { label: 'Vakfımız', href: '/vakfimiz/tarihcesi' },
        { label: 'Tarihçemiz', href: '/vakfimiz/tarihcesi' },
      ]}
    />
  );
}