import { createClient, type ClientConfig } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2025-02-19",
  useCdn: false,
};

const client = createClient(config);

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}

// Sanity puts an image's size in its asset id (image-<hash>-800x600-png).
export function imageDimensions(image: { asset?: { _ref?: string } } | undefined) {
  const match = image?.asset?._ref?.match(/-(\d+)x(\d+)-[a-z]+$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : undefined;
}

export default client;

// The singleton siteSettings document (logo, service times, footer details).
export const fetchSiteSettings = () => client.fetch(`*[_id == "siteSettings"][0]`);
