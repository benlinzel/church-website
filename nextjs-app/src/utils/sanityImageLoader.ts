import type { ImageLoaderProps } from "next/image";

// next/image can't resize images in a static export, so Sanity's image CDN
// does it: next/image asks for each width in its srcset and this rewrites the
// URL from urlFor(). If the URL fixes both width and height (a crop), the
// height scales with the width so the shape stays the same.
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  const url = new URL(src);
  const w = Number(url.searchParams.get("w"));
  const h = Number(url.searchParams.get("h"));
  if (w && h) url.searchParams.set("h", String(Math.round((width * h) / w)));
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  if (!h) url.searchParams.set("fit", "max"); // never upscale past the original
  return url.toString();
}
