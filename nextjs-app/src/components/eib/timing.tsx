// When the Evening in Bethlehem promotion comes down. The site is a static
// export, so this is checked twice: at build time (getStaticProps passes
// `builtOver`) and again in the browser, for builds made before the cutoff.
import { useSyncExternalStore } from "react";

import { EIB } from "./content";

export const isEibOver = (now = Date.now()) => now >= new Date(EIB.showUntil).getTime();

const subscribeNever = () => () => {};

/**
 * Whether the promotion is over, rechecked in the browser after hydration.
 * Hydrates with the build-time answer so the first render matches the HTML.
 */
export const useEibOver = (builtOver: boolean) =>
  useSyncExternalStore(subscribeNever, () => isEibOver(), () => builtOver);

/**
 * Add this class to promo markup in pages built before the cutoff. The inline
 * script below hides it as the HTML loads, before React has started, so an
 * old build never flashes the promo.
 */
export const HIDE_WHEN_OVER = "[[data-eib-over]_&]:hidden";

export const EibOverScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `if(Date.now()>=${new Date(EIB.showUntil).getTime()})document.documentElement.setAttribute("data-eib-over","")`,
    }}
  />
);
