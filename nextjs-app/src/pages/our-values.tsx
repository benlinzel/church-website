import { PortableText } from '@portabletext/react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { client, myPortableTextComponents, urlFor } from '@/utils/SanityConfig';

const OurValues = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-5xl font-semibold text-white md:text-5xl">
          Our Values
        </p>
        <div className="mx-auto max-w-[900px] px-8 pb-8">
          {props.values
            .filter((value: any) => value.title)
            .map((value: any, index: number) => {
              return (
                <div key={`${value.order}-${value.title}`} className="py-4">
                  <p className="text-3xl text-white">{value.title}</p>
                  <PortableText
                    value={value.body}
                    components={myPortableTextComponents}
                  />
                  {index + 1 !== props.values.length && (
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
  const values = await client.fetch(
    `*[_type == "churchValue"] | order(order asc)`
  );
  return {
    props: {
      siteSettings,
      values,
    },
    revalidate: 60,
  };
}

export default OurValues;
