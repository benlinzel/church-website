import { PortableText } from '@portabletext/react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { client, myPortableTextComponents, urlFor } from '@/utils/SanityConfig';

const WhatWeBelieve = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-4xl font-semibold text-white md:text-5xl">
          What We Believe
        </p>
        <div className="mx-auto max-w-[900px] space-y-4 px-8 pb-8">
          <p className="pt-8 text-3xl text-white">
            21 Articles of Faith and Doctrine
          </p>
          {props.faithArticles
            .filter((faithArticle: any) => faithArticle.title)
            .map((faithArticle: any, index: number) => {
              return (
                <div
                  key={`${faithArticle.order}-${faithArticle.title}`}
                  className="py-4"
                >
                  <p className="text-2xl font-light text-amber-500">
                    {faithArticle.title}
                  </p>
                  <PortableText
                    value={faithArticle.body}
                    components={myPortableTextComponents}
                  />
                  {index + 1 !== props.faithArticles.length && (
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
  const faithArticles = await client.fetch(
    `*[_type == "faithArticle"] | order(order asc)`
  );
  return {
    props: {
      siteSettings,
      faithArticles,
    },
    revalidate: 60,
  };
}

export default WhatWeBelieve;
