import { PortableText } from '@portabletext/react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { client, myPortableTextComponents, urlFor } from '@/utils/SanityConfig';

const YouthMinistry = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-4xl font-semibold text-white md:text-5xl">
          {props.youthMinistry.title}
        </p>
        <div className="mx-auto max-w-[900px] px-8 pb-8">
          <p className="text-xl font-light text-amber-500">
            {props.youthMinistry.subtitle}
          </p>
          <PortableText
            value={props.youthMinistry.description}
            components={myPortableTextComponents}
          />
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
  const youthMinistry = await client
    .fetch(`*[_id == "youthMinistry"]`)
    .then((youth) => {
      return youth[0];
    });
  return {
    props: {
      siteSettings,
      youthMinistry,
    },
    revalidate: 60,
  };
}

export default YouthMinistry;
