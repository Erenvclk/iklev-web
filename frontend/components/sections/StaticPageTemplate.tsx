import { getStaticPage } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

interface StaticPageData {
  data: Array<{
    id: number;
    title: string;
    slug: string;
    content: object[];
  }>;
}

interface Props {
  slug: string;
  breadcrumb: { label: string; href: string }[];
}

export default async function StaticPageTemplate({ slug, breadcrumb }: Props) {
  const res = (await getStaticPage(slug)) as StaticPageData;
  const page = res?.data?.[0];

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Başlık bandı */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-4">
            <a href="/" className="hover:text-stone-600 transition-colors">Ana Sayfa</a>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {i === breadcrumb.length - 1 ? (
                  <span className="text-stone-600">{item.label}</span>
                ) : (
                  <a href={item.href} className="hover:text-stone-600 transition-colors">
                    {item.label}
                  </a>
                )}
              </span>
            ))}
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">{page.title}</h1>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl border border-stone-200 p-8 md:p-12">
          <div className="prose prose-stone max-w-none
            prose-headings:font-bold prose-headings:text-stone-900
            prose-p:text-stone-600 prose-p:leading-relaxed
            prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-stone-800
            prose-ul:text-stone-600 prose-ol:text-stone-600
            prose-li:leading-relaxed">
            <BlocksRenderer content={page.content as Parameters<typeof BlocksRenderer>[0]['content']} />
          </div>
        </div>
      </div>
    </div>
  );
}