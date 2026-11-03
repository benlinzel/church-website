// Homepage promo for /eib in the flyer's red suede style. Removes itself once
// the event has ended, so it doesn't need taking down by hand.
import Link from "next/link";
import { useEffect, useState } from "react";

import { Donkey, Sheep } from "./art";
import { EIB } from "./content";
import styles from "./eib.module.css";
import { eibDisplayFont } from "./fontDisplay";

const HomeBanner = () => {
  const [over, setOver] = useState(false);

  useEffect(() => {
    setOver(Date.now() >= new Date(EIB.endsAt).getTime());
  }, []);

  if (over) return null;

  return (
    <section
      aria-label={EIB.title}
      className={`${eibDisplayFont.variable} ${styles.texture} ${styles.red} relative overflow-hidden text-[#efe8dc]`}
    >
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-[-2%] flex items-end gap-2 text-black opacity-[0.16]">
        <Sheep className="w-20 -scale-x-100 md:w-28" />
        <Donkey className="w-44 md:w-56" />
      </div>

      <Link
        href="/eib"
        className="group relative mx-auto flex max-w-[1100px] flex-col items-center gap-8 px-6 py-14 text-center sm:flex-row sm:text-left md:py-16"
      >
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#efe8dc]/80 md:text-sm">
            {EIB.dateLong}
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">{EIB.time}</span>
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-eib-display)] text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em]">
            An Evening in Bethlehem
          </h2>
          <p className="mt-3 max-w-xl text-base md:text-lg">
            {EIB.tagline}. Free, with live music and animals. Registration required.
          </p>
        </div>

        <span className="flex-none rounded-full bg-[#efe8dc] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#7a1f1a] shadow-lg transition group-hover:-translate-y-0.5 group-hover:bg-white">
          Find out more <span aria-hidden>→</span>
        </span>
      </Link>
    </section>
  );
};

export default HomeBanner;
