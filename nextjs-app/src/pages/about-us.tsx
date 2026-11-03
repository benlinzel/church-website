import { PortableText } from "@portabletext/react";

import PageLayout from "@/components/PageLayout";
import { AppConfig } from "@/utils/AppConfig";
import { myPortableTextComponents } from "@/utils/SanityConfig";
import client, { fetchSiteSettings } from "@/utils/sanity.client";

const AboutUs = (props: any) => {
  return (
    <PageLayout siteSettings={props.siteSettings} title="About Us">
      <p className="text-lg">{AppConfig.title} holds to the following statements:</p>
      <div className="mt-4 divide-y divide-white/10">
        {props.statements
          .filter((statement: any) => statement.title)
          .map((statement: any) => {
            return (
              <section key={statement._id} className="py-8">
                <h2 className="font-display text-2xl font-medium">
                  <a href={statement.link} className="text-amber-500 hover:underline">
                    {statement.order}. {statement.title}
                  </a>
                </h2>
                <PortableText value={statement.body} components={myPortableTextComponents} />
              </section>
            );
          })}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const siteSettings = await fetchSiteSettings();
  const statements = await client.fetch(`*[_type == "statement"] | order(order asc)`);
  return {
    props: {
      siteSettings,
      statements,
    },
  };
}

export default AboutUs;
