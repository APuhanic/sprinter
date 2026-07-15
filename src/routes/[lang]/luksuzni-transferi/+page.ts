import type { PageLoad } from './$types';

// Transfers-specific Open Graph image. The layout renders a single og:image
// from page.data.ogImage (falling back to the cleaning default), so social
// previews for this page — and the /monumenti partner link that redirects
// here — show the luxury vehicle, not the site-wide default.
//
// `data` carries the reviews loaded in +page.server.ts; spread it through so it
// reaches the page alongside ogImage.
export const load: PageLoad = ({ data }) => ({ ...data, ogImage: '/images/og/transfers-og.jpg' });
