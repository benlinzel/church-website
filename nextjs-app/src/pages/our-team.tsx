import { PortableText } from "@portabletext/react";
import Image from "next/image";

import PageLayout from "@/components/PageLayout";
import { myPortableTextComponents } from "@/utils/SanityConfig";
import client, { fetchSiteSettings, urlFor } from "@/utils/sanity.client";

const initials = (name: string) =>
  name
    .replace(/^Pastor\s+/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

const showBios = process.env.NEXT_PUBLIC_SHOW_TEAM_BIOS === "true";

// One person per row: photo on the left, name, role and bio beside it. On
// phones a smaller photo sits next to the name, with the bio underneath.
const OurTeam = (props: any) => {
  return (
    <PageLayout siteSettings={props.siteSettings} title="Our Team">
      <div className="divide-y divide-white/10">
        {props.teamMembers
          .filter((teamMember: any) => teamMember.name && teamMember.title)
          .map((teamMember: any) => {
            return (
              <article
                key={teamMember.name}
                className="grid grid-cols-[6rem_1fr] gap-x-5 gap-y-4 py-10 [grid-template-areas:'photo_name'_'bio_bio'] first:pt-0 sm:grid-cols-[13rem_1fr] sm:grid-rows-[auto_1fr] sm:gap-x-10 sm:[grid-template-areas:'photo_name'_'photo_bio']"
              >
                <div className="[grid-area:photo]">
                  {teamMember.headshot ? (
                    <Image
                      src={urlFor(teamMember.headshot).width(600).height(600).url()}
                      alt={teamMember.name}
                      className="aspect-square w-full rounded-lg object-cover"
                      width={300}
                      height={300}
                      unoptimized
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="grid aspect-square w-full place-items-center rounded-lg bg-white/5 font-display text-3xl text-white/40 ring-1 ring-white/10 sm:text-5xl"
                    >
                      {initials(teamMember.name)}
                    </div>
                  )}
                </div>
                <div className="self-center [grid-area:name] sm:self-start">
                  <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                    {teamMember.name}
                  </h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
                    {teamMember.title}
                  </p>
                </div>
                {showBios && teamMember.bio && (
                  <div className="text-white/80 [grid-area:bio] [&>*:first-child]:mt-0">
                    <PortableText value={teamMember.bio} components={myPortableTextComponents} />
                  </div>
                )}
              </article>
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
