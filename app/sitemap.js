export default function sitemap() {
  const baseUrl = "https://david-kieu-personal-website.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/3d-representation-training-speed`,
      lastModified: new Date("2026-08-12"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/coding-with-guardrails-not-line-by-line`,
      lastModified: new Date("2026-08-11"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/multi-agent-data-engineering-swarm`,
      lastModified: new Date("2026-08-04"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/llm-app-reliability-routing-retries`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
