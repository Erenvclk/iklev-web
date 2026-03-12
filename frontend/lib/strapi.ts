// frontend/lib/strapi.ts

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

async function fetchStrapi<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    next: { revalidate: 3600 }, // ISR: 1 saat
  });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${path}`);
  return res.json();
}

export async function getAnnouncements() {
  return fetchStrapi('/announcements?sort=publishedAt:desc&populate=coverImage');
}

export async function getAnnouncementBySlug(slug: string) {
  return fetchStrapi(`/announcements?filters[slug][$eq]=${slug}&populate=coverImage`);
}

export async function getBoardMembers() {
  return fetchStrapi('/board-members?sort=order:asc');
}

export async function getStaticPage(slug: string) {
  return fetchStrapi(`/static-pages?filters[slug][$eq]=${slug}`);
}

export async function getSiteSettings() {
  return fetchStrapi('/site-setting');
}

export async function getHeroSlides() {
  return fetchStrapi('/hero-slides?sort=order:asc&populate=image');
}