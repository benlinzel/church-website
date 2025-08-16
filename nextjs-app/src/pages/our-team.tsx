import { PortableText } from "@portabletext/react";
import Image from "next/image";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { client, myPortableTextComponents, urlFor } from "@/utils/SanityConfig";

const OurTeam = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-4xl font-semibold text-white md:text-5xl">
          Our Team
        </p>
        <div className="mx-auto grid max-w-[900px] grid-cols-1 p-2 md:grid-cols-2">
          {props.teamMembers
            .filter((teamMember: any) => teamMember.name && teamMember.title)
            .map((teamMember: any) => {
              return (
                <div key={teamMember.name} className="mx-4 py-4">
                  {teamMember.headshot ? (
                    <Image
                      src={urlFor(teamMember.headshot)
                        .width(600)
                        .height(600)
                        .url()}
                      alt="headshot"
                      className="mx-auto rounded-lg"
                      width={300}
                      height={300}
                      unoptimized
                    ></Image>
                  ) : (
                    <div className="h-[200px]"></div>
                  )}
                  <p className="text-center text-lg text-white sm:text-2xl">
                    {teamMember.name}
                  </p>
                  <p className="text-center text-base font-extralight text-white/60 sm:text-xl">
                    {teamMember.title}
                  </p>
                  {process.env.NEXT_PUBLIC_SHOW_TEAM_BIOS === "true" &&
                    teamMember.bio && (
                      <PortableText
                        value={teamMember.bio}
                        components={myPortableTextComponents}
                      />
                    )}
                  <hr className="mt-4 opacity-20" />
                </div>
              );
            })}
        </div>
      </div>
      <Footer siteSettings={props.siteSettings} />
    </div>
  );
};

export async function getStaticProps() {
  const siteSettings = await client
    .fetch(`*[_id == "siteSettings"]`)
    .then((settings: any[]) => {
      return settings[0];
    });
  const teamMembers = await client.fetch(
    `*[_type == "teamMember"] | order(order asc)`
  );
  return {
    props: {
      siteSettings,
      teamMembers,
    },
    // revalidate: 60,
  };
}

export default OurTeam;
