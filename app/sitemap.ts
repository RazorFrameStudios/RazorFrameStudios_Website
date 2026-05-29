import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://razorframestudios.in',           lastModified: new Date() },
    { url: 'https://razorframestudios.in/services',  lastModified: new Date() },
    { url: 'https://razorframestudios.in/work',      lastModified: new Date() },
    { url: 'https://razorframestudios.in/booking',   lastModified: new Date() },
  ]
}