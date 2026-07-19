import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: BASE_URL.replace(/^https?:\/\//, ''),
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

