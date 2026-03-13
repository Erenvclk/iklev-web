// frontend/lib/strapi.ts

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

async function fetchStrapi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
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