import { SITE_URL } from '@/data/site';

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/menu`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
  ];
}
