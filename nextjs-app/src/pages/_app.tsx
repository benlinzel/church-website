import '../styles/global.css';

import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { AppConfig } from '@/utils/AppConfig';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        url: 'https://winonagospelchurch.com',
        siteName: AppConfig.site_name,
        title: AppConfig.title,
        description: AppConfig.description,
      }}
      // twitter={{
      //   handle: "@handle",
      //   site: "@site",
      //   cardType: "summary_large_image",
      // }}
    />
    <Component {...pageProps} />
    <Analytics />
  </>
);

export default MyApp;
