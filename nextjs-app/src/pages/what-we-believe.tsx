import { PortableText } from "@portabletext/react";

import PageLayout from "@/components/PageLayout";
import { myPortableTextComponents } from "@/utils/SanityConfig";
import client, { fetchSiteSettings } from "@/utils/sanity.client";

const WhatWeBelieve = (props: any) => {
  return (
    <PageLayout siteSettings={props.siteSettings} title="What We Believe">
      <h2 className="font-display text-3xl font-semibold text-white">
        21 Articles of Faith and Doctrine
      </h2>
      <div className="mt-4 divide-y divide-white/10">
        {props.faithArticles
          .filter((faithArticle: any) => faithArticle.title)
          .map((faithArticle: any) => {
            return (
              <section key={faithArticle._id} className="py-8">
                <h3 className="font-display text-2xl font-medium text-amber-500">
                  {faithArticle.title}
                </h3>
                <PortableText value={faithArticle.body} components={myPortableTextComponents} />
              </section>
            );
          })}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const siteSettings = await fetchSiteSettings();
  const faithArticles = await client.fetch(`*[_type == "faithArticle"] | order(order asc)`);
  return {
    props: {
      siteSettings,
      faithArticles,
    },
  };
}

export default WhatWeBelieve;
