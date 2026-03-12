import StaticPageTemplate from '@/components/sections/StaticPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Burs Yönetmeliği — İKLEV',
  description: 'İKLEV burs yönetmeliği.',
};

export default function BursYonetmeligiPage() {
  return (
    <StaticPageTemplate
      slug="burs-yonetmeligi"
      breadcrumb={[
        { label: 'Burslar', href: '/burslar/basvuru' },
        { label: 'Burs Yönetmeliği', href: '/burslar/yonetmeligi' },
      ]}
    />
  );
}