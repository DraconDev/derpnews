import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL - replace with your actual domain in production
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://derpnews.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ] as const

  // TODO: Add dynamic article pages
  // You can fetch your articles and add them here
  // const articles = await prisma.article.findMany()
  // const articlePages = articles.map((article) => ({
  //   url: `${baseUrl}/article/${article.slug}`,
  //   lastModified: article.updatedAt,
  //   changeFrequency: 'weekly',
  //   priority: 0.9,
  // }))

  return [...staticPages]
}
