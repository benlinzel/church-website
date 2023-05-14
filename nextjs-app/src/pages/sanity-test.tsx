import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { InferGetStaticPropsType } from 'next';
import { createClient } from 'next-sanity';

import { Main } from '@/components/Main';
import { Meta } from '@/layouts/Meta';

const client = createClient({
  projectId: '5vf3tw8e',
  dataset: 'production',
  apiVersion: '2023-01-30',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      console.log(value);
      return <img src={urlFor(value?.asset?._ref).url()} />;
    },
    code: (props: any) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};

const About = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <h2>{props.post[0].title}</h2>
    <img
      className="bg-gray-500"
      src={urlFor(props.post[0].mainImage).width(600).url()}
    />
    <PortableText
      value={props.post[0].body}
      components={myPortableTextComponents}
    />
  </Main>
);

export async function getStaticProps() {
  const post = await client.fetch(`*[_type == "post"]`);
  return {
    props: {
      post,
    },
  };
}

export default About;
