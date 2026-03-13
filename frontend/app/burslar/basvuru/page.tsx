import StaticPageTemplate from '@/components/sections/StaticPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bursiyer Başvuru — İKLEV',
  description: 'İKLEV burs başvurusu hakkında bilgi.',
};
export const dynamic = 'force-dynamic';


export default function BursBasvuruPage() {
  return (
    <StaticPageTemplate
      slug="burs-basvuru"
      breadcrumb={[
        { label: 'Burslar', href: '/burslar/basvuru' },
        { label: 'Bursiyer Başvuru', href: '/burslar/basvuru' },
      ]}
    />
  );
}