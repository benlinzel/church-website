import "../styles/global.css";

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import { AppConfig } from "@/utils/AppConfig";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: process.env.NEXT_PUBLIC_SITE_URL!,
        siteName: AppConfig.site_name,
        title: AppConfig.title,
        description: AppConfig.description,
      }}
      title={AppConfig.title}
      description={AppConfig.description}
      twitter={{
        handle: "@handle",
      }}
    />
    <Component {...pageProps} />
    <Analytics />
  </>
);

export default MyApp;
