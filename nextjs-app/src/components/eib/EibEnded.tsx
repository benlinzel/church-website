// What /eib shows once the promotion is over (see timing.tsx): a short thank
// you in the flyer's style instead of registration details.
import Link from "next/link";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { Donkey, Sheep } from "./art";
import { EIB } from "./content";
import { EibShell, type EibVariantProps, styles } from "./shared";

const EibEnded = ({ siteSettings }: Pick<EibVariantProps, "siteSettings">) => (
  <EibShell className="bg-[#4b5c43] text-[#efe8dc]">
    <section className={`${styles.texture} ${styles.red} relative overflow-hidden`}>
      <Navbar logo={siteSettings?.logo} />

      <div aria-hidden className="pointer-events-none absolute bottom-0 right-[-2%] flex items-end gap-2 text-black opacity-[0.16]">
        <Sheep className="w-20 -scale-x-100 md:w-32" />
        <Donkey className="w-48 md:w-72" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pb-44 pt-10 md:pb-56 md:pt-16">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[#efe8dc]/80">
          {EIB.dateLong}
        </p>
        <h1 className="mt-4 font-display text-[clamp(3rem,9.4vw,8.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em]">
          An Evening in
          <br />
          Bethlehem
        </h1>
        <p className="mt-10 max-w-xl font-display text-lg font-semibold uppercase leading-snug tracking-wide md:text-xl">
          Thank you to everyone who journeyed with us! This year&rsquo;s event has ended.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#efe8dc] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#7a1f1a] shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
        >
          Back to home
        </Link>
      </div>
    </section>
    <div className={`${styles.texture} ${styles.green}`}>
      <Footer siteSettings={siteSettings} />
    </div>
  </EibShell>
);

export default EibEnded;
