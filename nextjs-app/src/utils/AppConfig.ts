export const AppConfig = {
  site_name: process.env.NEXT_PUBLIC_CHURCH_NAME!,
  title: process.env.NEXT_PUBLIC_CHURCH_NAME!,
  description: `${process.env.NEXT_PUBLIC_CHURCH_NAME} in Stoney Creek, Ontario.`,
  locale: "en",
};

// The church doesn't want the site in search results or used by AI tools.
// Every page sends this robots tag (public/_headers sends the same thing as an
// X-Robots-Tag header, and public/robots.txt turns crawlers away). Spread it
// into every generateDefaultSeo / generateNextSeo call: a page-level call
// replaces the default robots tag rather than adding to it.
export const NO_INDEX = {
  noindex: true,
  nofollow: true,
  robotsProps: { noarchive: true, nosnippet: true, noimageindex: true },
};
