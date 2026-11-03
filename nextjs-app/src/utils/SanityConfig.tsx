import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

import { urlFor } from "./sanity.client";

// How rich text from Sanity renders. `spaced` adds margins between blocks
// for full pages; the homepage event cards use it without.
const portableTextComponents = (spaced: boolean): PortableTextComponents => {
  const my = spaced ? "my-4 " : "";
  return {
    types: {
      // the whole image value (not just its asset) so the crop and hotspot set
      // in the Studio apply
      image: ({ value }) => (
        <div className="relative my-4 h-[400px] w-full">
          <Image
            src={urlFor(value).width(1200).height(900).url()}
            alt={value?.alt ?? ""}
            fill
            sizes="(min-width: 900px) 852px, 100vw"
            className="rounded-lg object-cover"
          />
        </div>
      ),
    },
    block: {
      normal: ({ children }) => <p className={`${my}text-base`}>{children}</p>,
      h1: ({ children }) => (
        <h1 className={`${my}font-display text-4xl font-semibold text-white`}>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className={`${my}font-display text-3xl font-semibold text-white`}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className={`${my}font-display text-2xl font-semibold text-white`}>{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className={`${my}font-display text-xl font-semibold text-white`}>{children}</h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className={`${my}border-l-4 border-l-amber-500 pl-2`}>{children}</blockquote>
      ),
    },
  };
};

export const myPortableTextComponents = portableTextComponents(true);
export const myPortableTextComponentsNoMargin = portableTextComponents(false);
