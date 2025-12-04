import Image from "next/image";
import client, { urlFor } from "./sanity.client";

// Re-export for backward compatibility
export { client, urlFor };

export const myPortableTextComponentsNoMargin = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative my-4 h-[400px] w-full">
          <Image
            src={urlFor(value?.asset?._ref).width(450).height(450).url()}
            alt={"image"}
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>
      );
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
  },
};

export const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative my-4 h-[400px] w-full">
          <Image
            src={urlFor(value?.asset?._ref).width(1200).height(900).url()}
            alt={"image"}
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>
      );
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
  },
};
