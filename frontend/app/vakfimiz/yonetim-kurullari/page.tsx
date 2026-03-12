import { getBoardMembers } from '@/lib/strapi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yönetim Kurulları — İKLEV',
  description: 'İzmir Karşıyaka Lisesi Eğitim Vakfı yönetim kurulu üyeleri.',
};

interface BoardMember {
  id: number;
  name: string;
  title: string;
  order: number;
}

interface BoardMembersRes {
  data: BoardMember[];
}

export default async function YonetimKurullariPage() {
  const res = (await getBoardMembers()) as BoardMembersRes;
  const members = res?.data ?? [];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Başlık bandı */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-4">
            <a href="/" className="hover:text-stone-600 transition-colors">Ana Sayfa</a>
            <span>/</span>
            <a href="/vakfimiz/tarihcesi" className="hover:text-stone-600 transition-colors">Vakfımız</a>
            <span>/</span>
            <span className="text-stone-600">Yönetim Kurulları</span>
          </nav>
          <h1 className="text-3xl font-bold text-stone-900">Yönetim Kurulları</h1>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          {members.length === 0 ? (
            <div className="p-12 text-center text-stone-400">
              <p>Henüz üye bilgisi eklenmemiş.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">
                    Ad Soyad
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">
                    Görevi
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, i) => (
                  <tr
                    key={member.id}
                    className={`border-b border-stone-100 last:border-0 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-stone-800">{member.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          member.order === 1
                            ? 'bg-green-100 text-green-700'
                            : member.order === 2
                            ? 'bg-stone-100 text-stone-600'
                            : 'bg-stone-50 text-stone-500'
                        }`}
                      >
                        {member.title}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}