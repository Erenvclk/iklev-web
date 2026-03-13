import StaticPageTemplate from '@/components/sections/StaticPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vakıf Senedi — İKLEV',
  description: 'İzmir Karşıyaka Lisesi Eğitim Vakfı senedi.',
};

export const dynamic = 'force-dynamic';

export default function VakifSenediPage() {
  return (
    <StaticPageTemplate
      slug="vakif-senedi"
      breadcrumb={[
        { label: 'Vakfımız', href: '/vakfimiz/tarihcesi' },
        { label: 'Vakıf Senedi', href: '/vakfimiz/vakif-senedi' },
      ]}
    />
  );
}