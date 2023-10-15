/* eslint-disable react/no-unescaped-entities */
import { PortableText } from "@portabletext/react";
import Link from "next/link";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { client, myPortableTextComponents, urlFor } from "@/utils/SanityConfig";

const AboutUs = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-5xl font-semibold text-white md:text-5xl">
          About Us
        </p>
        {/* <div className="mx-auto max-w-[900px] px-8 pb-8 sm:text-lg"> */}
        <div className="text-md mx-auto max-w-[900px] p-8 sm:text-lg">
          <p className="justify-center pb-4">
            Winona Gospel Church holds to the following statements:
          </p>
          {props.statements
            .filter((statement: any) => statement.title)
            .map((statement: any, index: number) => {
              return (
                <div
                  key={`${statement.order}-${statement.title}`}
                  className="py-4"
                >
                  {/* <p className="text-3xl text-white">{statement.title}</p> */}
                  <Link
                    href={statement.link}
                    className="text-2xl font-light text-amber-500 hover:underline"
                  >
                    {statement.order}. {statement.title}
                  </Link>
                  <PortableText
                    value={statement.body}
                    components={myPortableTextComponents}
                  />
                  {index + 1 !== props.statements.length && (
                    <hr className="mt-8 opacity-20" />
                  )}
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
    .then((settings) => {
      return settings[0];
    });
  const statements = await client.fetch(
    `*[_type == "statement"] | order(order asc)`
  );
  return {
    props: {
      siteSettings,
      statements,
    },
    revalidate: 60,
  };
}

export default AboutUs;
