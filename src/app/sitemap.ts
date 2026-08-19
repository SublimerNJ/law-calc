import { MetadataRoute } from 'next';
import { TOOLS } from '@/lib/tools-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const REVIEW_DATE = new Date('2026-08-19T00:00:00+09:00');

export default function sitemap(): MetadataRoute.Sitemap {
 const toolUrls: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
 url: `${BASE_URL}${tool.route}`,
 lastModified: tool.updatedAt ? new Date(`${tool.updatedAt}T00:00:00+09:00`) : REVIEW_DATE,
 changeFrequency: 'monthly' as const,
 priority: 0.8,
 }));

 const staticPages: MetadataRoute.Sitemap = [
 { url: `${BASE_URL}/about`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/contact`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.5 },
 { url: `${BASE_URL}/privacy`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.3 },
 { url: `${BASE_URL}/terms`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.3 },
 { url: `${BASE_URL}/editorial-policy`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.5 },
 { url: `${BASE_URL}/guides`, lastModified: REVIEW_DATE, changeFrequency: 'weekly' as const, priority: 0.7 },
 { url: `${BASE_URL}/guides/how-to-calculate-attorney-fee`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/civil-mediation-vs-lawsuit`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/understanding-severance-pay`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/minimum-wage-penalty`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/unfair-dismissal-relief`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/industrial-accident-compensation`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/deposit-return-dispute`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/capital-gains-tax-exemption`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/comprehensive-income-tax-freelancer`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 { url: `${BASE_URL}/guides/defamation-sns`, lastModified: REVIEW_DATE, changeFrequency: 'monthly' as const, priority: 0.6 },
 ];

 return [
 {
 url: BASE_URL,
 lastModified: REVIEW_DATE,
 changeFrequency: 'weekly' as const,
 priority: 1.0,
 },
 ...staticPages,
 ...toolUrls,
 ];
}
