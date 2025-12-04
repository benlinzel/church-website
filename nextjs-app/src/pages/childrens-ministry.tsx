import { PortableText } from "@portabletext/react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { myPortableTextComponents } from "@/utils/SanityConfig";
import client, { urlFor } from "@/utils/sanity.client";

const ChildrensMinistry = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-4xl font-semibold text-white md:text-5xl">
          {props.childrensMinistry.title}
        </p>
        <div className="mx-auto max-w-[900px] px-8 pb-8">
          <p className="text-xl font-light text-amber-500">
            {props.childrensMinistry.subtitle}
          </p>
          <PortableText
            value={props.childrensMinistry.description}
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
    .then((settings: any[]) => {
      return settings[0];
    });
  const childrensMinistry = await client
    .fetch(`*[_id == "childrensMinistry"]`)
    .then((childrens: any[]) => {
      return childrens[0];
    });
  return {
    props: {
      siteSettings,
      childrensMinistry,
    },
    // revalidate: 60,
  };
}

export default ChildrensMinistry;
