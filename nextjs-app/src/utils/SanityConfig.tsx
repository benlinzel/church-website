import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: '5vf3tw8e',
  dataset: 'production',
  apiVersion: '2023-01-30',
  useCdn: false,
});

export const imgBuilder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return imgBuilder.image(source);
}

export const myPortableTextComponentsNoMargin = {
  types: {
    image: ({ value }: any) => {
      return <img src={urlFor(value?.asset?._ref).url()} />;
    },
    code: (prop: any) => (
      <pre data-language={prop.node.language}>
        <code>{prop.node.code}</code>
      </pre>
    ),
  },
  block: {
    // Ex. 1: customizing common block types
    normal: ({ children }: any) => <p className="text-base">{children}</p>,
    h1: ({ children }: any) => (
      <h1 className="text-4xl text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl text-white">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl text-white">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-l-amber-500 pl-2">
        {children}
      </blockquote>
    ),
    // Ex. 2: rendering custom styles
    // customHeading: ({ children }) => (
    //   <h2 className="text-primary text-lg text-purple-700">{children}</h2>
    // ),
  },
};

export const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return <img src={urlFor(value?.asset?._ref).url()} />;
    },
    code: (prop: any) => (
      <pre data-language={prop.node.language}>
        <code>{prop.node.code}</code>
      </pre>
    ),
  },
  block: {
    // Ex. 1: customizing common block types
    normal: ({ children }: any) => <p className="my-4 text-base">{children}</p>,
    h1: ({ children }: any) => (
      <h1 className="my-4 text-4xl text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="my-4 text-3xl text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="my-4 text-2xl text-white">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="my-4 text-xl text-white">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-4 border-l-4 border-l-amber-500 pl-2">
        {children}
      </blockquote>
    ),
    // Ex. 2: rendering custom styles
    // customHeading: ({ children }) => (
    //   <h2 className="text-primary text-lg text-purple-700">{children}</h2>
    // ),
  },
};

// const missionsImages = {
//   types: {
//     image: ({ value }: any) => {
//       return (
//         <img
//           className="mx-auto max-h-[400px]"
//           src={urlFor(value?.asset?._ref).url()}
//         />
//       );
//     },
//   },
// };

// export const myPortableTextComponentsMissions = {
//   ...myPortableTextComponents,
//   ...missionsImages,
// };
