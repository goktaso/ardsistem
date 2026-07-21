import { POSTS } from './blog/posts'

const SITE_URL = 'https://ardsistem.net.tr'

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...POSTS.map(p => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
    { url: `${SITE_URL}/kvkk`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/cerez-politikasi`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]
}
