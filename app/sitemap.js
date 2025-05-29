export default function sitemap() {
  const baseUrl = 'https://yourwebsite.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/building-scalable-react-applications`,
      lastModified: new Date('2025-05-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/nextjs-15-new-features`,
      lastModified: new Date('2025-05-10'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/typescript-best-practices`,
      lastModified: new Date('2025-05-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
