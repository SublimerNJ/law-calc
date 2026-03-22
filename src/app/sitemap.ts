import { MetadataRoute } from 'next';
import { TOOLS } from '@/lib/tools-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://lawcalc.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${BASE_URL}${tool.route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...toolUrls,
  ];
}
