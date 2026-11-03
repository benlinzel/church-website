import { PortableText } from "@portabletext/react";

import PageLayout from "@/components/PageLayout";
import { myPortableTextComponents } from "@/utils/SanityConfig";
import client, { fetchSiteSettings } from "@/utils/sanity.client";

// Youth and children's ministry pages: one Sanity singleton each, with a
// title, subtitle and rich-text description.
const MinistryPage = ({ siteSettings, ministry }: { siteSettings: any; ministry: any }) => (
  <PageLayout siteSettings={siteSettings} title={ministry.title}>
    <p className="font-display text-xl font-medium text-amber-500">
      {ministry.subtitle}
    </p>
    <PortableText value={ministry.description} components={myPortableTextComponents} />
  </PageLayout>
);

export const getMinistryStaticProps = (documentId: string) => async () => {
  const siteSettings = await fetchSiteSettings();
  const ministry = await client.fetch(`*[_id == $documentId][0]`, { documentId });
  return {
    props: {
      siteSettings,
      ministry,
    },
  };
};

export default MinistryPage;
