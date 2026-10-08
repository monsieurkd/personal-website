export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://david-kieu-personal-website.vercel.app/sitemap.xml",
  };
}
