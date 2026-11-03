/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // a static export has no image server, so Sanity's CDN sizes the images
    loader: "custom",
    loaderFile: "./src/utils/sanityImageLoader.ts",
  },
};

export default nextConfig;
