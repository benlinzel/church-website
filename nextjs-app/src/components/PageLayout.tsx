import Head from "next/head";
import { useRouter } from "next/router";
import { generateNextSeo } from "next-seo/pages";
import type { ReactNode } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AppConfig } from "@/utils/AppConfig";
import { urlFor } from "@/utils/sanity.client";

// Shared frame for the inner pages: navbar, page title, a centred content
// column and the footer, so every page gets the same spacing and type.
const PageLayout = ({
  siteSettings,
  title,
  children,
}: {
  siteSettings: any;
  title: string;
  children: ReactNode;
}) => {
  const { pathname } = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 text-white/90">
      <Head>
        {generateNextSeo({
          title: `${title} | ${AppConfig.title}`,
          openGraph: {
            title,
            url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}${pathname}`,
          },
        })}
      </Head>
      <Navbar logoUrl={urlFor(siteSettings.logo).width(600).url()} />
      <main className="mx-auto w-full max-w-[900px] grow px-6 pb-20 pt-4 sm:px-8 md:pt-8">
        <h1 className="text-center font-display text-4xl font-bold text-white md:text-5xl">
          {title}
        </h1>
        <div className="mt-8 md:mt-12">{children}</div>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
};

export default PageLayout;
