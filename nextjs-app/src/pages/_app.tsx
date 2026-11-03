import "../styles/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { generateDefaultSeo } from "next-seo/pages";

import { AppConfig } from "@/utils/AppConfig";
import { SITE_FONTS, siteFontVars } from "@/utils/fonts";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      {generateDefaultSeo({
        openGraph: {
          type: "website",
          locale: "en_CA",
          url: process.env.NEXT_PUBLIC_SITE_URL!,
          siteName: AppConfig.site_name,
          title: AppConfig.title,
          description: AppConfig.description,
        },
        title: AppConfig.title,
        description: AppConfig.description,
      })}
    </Head>
    <div className={`${siteFontVars} ${SITE_FONTS}`}>
      <Component {...pageProps} />
    </div>
  </>
);

export default MyApp;
