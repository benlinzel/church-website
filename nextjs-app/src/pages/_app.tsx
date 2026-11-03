import "../styles/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { generateDefaultSeo } from "next-seo/pages";

import { AppConfig, NO_INDEX } from "@/utils/AppConfig";
import { SITE_FONTS, siteFontVars } from "@/utils/fonts";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      {generateDefaultSeo({
        ...NO_INDEX,
        // the default only honours these, not noindex/nofollow
        dangerouslySetAllPagesToNoIndex: true,
        dangerouslySetAllPagesToNoFollow: true,
        openGraph: {
          type: "website",
          locale: "en_CA",
          url: process.env.NEXT_PUBLIC_SITE_URL!,
          siteName: AppConfig.site_name,
          title: AppConfig.title,
          description: AppConfig.description,
          // 1200x630 link-preview card for every page; /eib has its own
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/share.jpg`,
              width: 1200,
              height: 630,
              alt: `Welcome to ${AppConfig.title}`,
            },
          ],
        },
        title: AppConfig.title,
        description: AppConfig.description,
        twitter: { cardType: "summary_large_image" },
      })}
    </Head>
    {/* overflow-x-clip (not hidden) so nothing can widen the page sideways
        without breaking position: sticky */}
    <div className={`${siteFontVars} ${SITE_FONTS} overflow-x-clip`}>
      <Component {...pageProps} />
    </div>
  </>
);

export default MyApp;
