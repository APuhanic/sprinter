// Transfers-specific Open Graph image. The layout renders a single og:image
// from page.data.ogImage (falling back to the cleaning default), so social
// previews for this page — and the /monumenti partner link that redirects
// here — show the luxury vehicle, not the site-wide default.
export const load = () => ({ ogImage: '/images/og/transfers-og.jpg' });
