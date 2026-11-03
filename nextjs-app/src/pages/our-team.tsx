import { PortableText } from "@portabletext/react";
import Image from "next/image";

import PageLayout from "@/components/PageLayout";
import { myPortableTextComponents } from "@/utils/SanityConfig";
import client, { fetchSiteSettings, urlFor } from "@/utils/sanity.client";

const OurTeam = (props: any) => {
  return (
    <PageLayout siteSettings={props.siteSettings} title="Our Team">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {props.teamMembers
          .filter((teamMember: any) => teamMember.name && teamMember.title)
          .map((teamMember: any) => {
            return (
              <div key={teamMember.name} className="text-center">
                {teamMember.headshot ? (
                  <Image
                    src={urlFor(teamMember.headshot).width(600).height(600).url()}
                    alt={teamMember.name}
                    className="mx-auto rounded-lg"
                    width={300}
                    height={300}
                    unoptimized
                  />
                ) : (
                  // keeps names lined up with photos in the two-column layout
                  <div className="hidden h-[300px] md:block" />
                )}
                <h2 className="mt-4 font-display text-xl font-semibold text-white sm:text-2xl">
                  {teamMember.name}
                </h2>
                <p className="mt-1 text-base text-white/60 sm:text-lg">{teamMember.title}</p>
                {process.env.NEXT_PUBLIC_SHOW_TEAM_BIOS === "true" && teamMember.bio && (
                  <div className="text-left">
                    <PortableText value={teamMember.bio} components={myPortableTextComponents} />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const siteSettings = await fetchSiteSettings();
  const teamMembers = await client.fetch(`*[_type == "teamMember"] | order(order asc)`);
  return {
    props: {
      siteSettings,
      teamMembers,
    },
  };
}

export default OurTeam;
