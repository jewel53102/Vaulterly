export default function sitemap() {
  const base = 'https://myvaulterly.com';
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
    },
    {
      url: `${base}/explore`,
      lastModified: new Date(),
    },
  ]
}