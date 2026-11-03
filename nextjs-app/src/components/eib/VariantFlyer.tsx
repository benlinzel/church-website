// Variant 1: the printed flyer brought to life. Same suede red/green palette
// and layout, with parallax animal silhouettes and scroll-linked headings.
import { type RefObject, useEffect, useRef } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { urlFor } from "@/utils/sanity.client";

import { Candle, Donkey, Sheep } from "./art";
import { EIB } from "./content";
import {
  countdownMessage,
  countdownUnits,
  cssVars,
  EibShell,
  type EibVariantProps,
  FloatingRegister,
  FormLink,
  Reveal,
  RisingText,
  styles,
  subscribeToFrames,
  useCountdown,
  useScrollProgress,
} from "./shared";

const GLANCE_CARD_STYLES = [
  "bg-[#7d0b0b] text-[#f6eee4]",
  "bg-white text-[#3b3330]",
  "bg-[#e8cfae] text-[#3b2a20]",
  "bg-[#3f4f30] text-[#f1ece2]",
];

const Hero = ({ logoUrl }: { logoUrl?: string }) => {
  const countdown = useCountdown();
  const message = countdownMessage(countdown);

  return (
    <section className={`${styles.texture} ${styles.red} relative overflow-hidden`}>
      <Navbar logoUrl={logoUrl} />

      {/* animals drift sideways at different speeds as you scroll */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] text-black opacity-[0.16]">
        <div
          className={`${styles.parallaxX} absolute bottom-[5.5rem] left-[-1%] w-[8%] min-w-[56px] max-w-[100px]`}
          style={cssVars({ "--speed": 0.08 })}
        >
          <Sheep />
        </div>
        <div
          className={`${styles.parallaxX} absolute bottom-[5.5rem] left-[6%] w-[30%] min-w-[180px] max-w-[340px]`}
          style={cssVars({ "--speed": 0.22 })}
        >
          <Donkey className="-scale-x-100" />
        </div>
        <div
          className={`${styles.parallaxX} absolute bottom-[5.5rem] left-[33%] w-[15%] min-w-[90px] max-w-[170px]`}
          style={cssVars({ "--speed": 0.4 })}
        >
          <Sheep />
        </div>
        <div
          className={`${styles.parallaxX} absolute bottom-28 right-[-4%] w-[26%] min-w-[160px] max-w-[300px] opacity-70`}
          style={cssVars({ "--speed": -0.12 })}
        >
          <Donkey />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pb-36 pt-6 md:pb-48 md:pt-10">
        {/* star over Bethlehem */}
        <div
          aria-hidden
          className={`${styles.parallaxY} absolute right-10 top-6 hidden w-28 text-[#efe8dc] md:block`}
          style={cssVars({ "--speed": 0.12 })}
        >
          <div className={styles.twinkle} style={cssVars({ "--lo": 0.7, "--dur": "4s" })}>
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
              <path d="M50 22 L53 47 L78 50 L53 53 L50 78 L47 53 L22 50 L47 47 Z" transform="rotate(45 50 50)" opacity="0.6" />
            </svg>
          </div>
        </div>

        <h1 className="font-eibDisplay text-[clamp(3rem,9.4vw,8.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] md:pr-28">
          <RisingText text="An Evening in" />
          <br />
          <RisingText text="Bethlehem" offset={13} />
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-end">
          <Reveal delay={700} from="right" className="md:order-last">
            <p className="font-eibDisplay text-3xl font-bold uppercase leading-[1.02] tracking-tight md:text-right md:text-[2.75rem]">
              {EIB.dateShort}
              <br />
              5:30–8:30PM
            </p>
          </Reveal>

          <Reveal delay={900}>
            <div className="space-y-6 font-eibDisplay text-base font-semibold uppercase tracking-wide md:text-lg">
              <p className="max-w-sm">{EIB.tagline}</p>
              <address className="not-italic">
                {EIB.venue}
                <br />
                {EIB.street},
                <br />
                {EIB.city}
              </address>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <FormLink
                className={`${styles.shine} rounded-full bg-[#efe8dc] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#7a1f1a] shadow-lg transition hover:-translate-y-0.5 hover:bg-white`}
              >
                Reserve your spot
              </FormLink>
              <a
                href={EIB.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#efe8dc]/70 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:border-[#efe8dc] hover:bg-[#efe8dc]/10"
              >
                Get directions
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/15">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
          <p className="font-eibDisplay text-sm font-semibold uppercase tracking-[0.2em] text-[#efe8dc]/80">
            {message ?? "The journey begins in"}
          </p>
          {!message && (
            <div className="flex gap-6 sm:gap-10" aria-live="off">
              {countdownUnits(countdown).map((unit) => (
                <div key={unit.label} className="text-center">
                  <div className="font-eibDisplay text-3xl font-extrabold tabular-nums tracking-tight sm:text-4xl">
                    {unit.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#efe8dc]/70">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const WhatToExpect = () => {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);

  return (
    <section ref={ref} className={`${styles.texture} ${styles.green} overflow-hidden`}>
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-20 md:grid-cols-[1.15fr_1fr] md:py-28">
        <div>
          <Reveal>
            <p className="max-w-xl font-eibDisplay text-lg font-semibold uppercase leading-snug tracking-wide md:text-xl">
              {EIB.intro}
            </p>
          </Reveal>
          <h2
            className={`${styles.scrollFx} mt-14 font-eibDisplay text-[clamp(3.5rem,9vw,6rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em]`}
            style={{ transform: "translateX(calc((0.55 - var(--p, 0.55)) * 40%))" }}
          >
            What to
            <br />
            expect
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {EIB.highlights.map((h, i) => (
            <li key={h.label}>
              <Reveal delay={i * 120} from="zoom" className="h-full">
                <div className="flex h-full min-h-[150px] flex-col justify-between border-2 border-[#efe8dc]/35 p-5 transition duration-500 hover:-translate-y-1 hover:border-[#efe8dc]/70 md:min-h-[190px] md:p-6">
                  <p className="font-eibDisplay text-5xl font-extrabold uppercase leading-none tracking-[-0.04em] md:text-6xl">
                    {h.big}
                  </p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#efe8dc]/85">
                    {h.label}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Register = () => (
  <section
    id="register"
    className={`${styles.texture} ${styles.parchment} scroll-mt-4 text-[#3b2a24]`}
  >
    <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8c3a35]">
          Free · Registration required
        </p>
        <h2 className="mt-3 font-eibDisplay text-[clamp(3rem,7vw,5.25rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em] text-[#8c3a35]">
          Reserve
          <br />
          your time
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed">
          Pick a 30-minute window on our registration form and we&rsquo;ll email you your exact
          start time.
        </p>
        <FormLink
          className={`${styles.shine} mt-8 inline-flex items-center gap-3 rounded-full bg-[#8c3a35] px-9 py-5 text-base font-bold uppercase tracking-wider text-[#f6eee4] shadow-[0_20px_40px_-15px_rgba(120,30,20,0.6)] transition hover:-translate-y-0.5 hover:bg-[#7a2f2a]`}
        >
          Register now <span aria-hidden>↗</span>
        </FormLink>
        <p className="mt-3 text-xs text-[#3b2a24]/60">Opens our Google Form in a new tab</p>
      </Reveal>

      <div className="border-t-2 border-[#8c3a35]/20 pt-10 lg:border-l-2 lg:border-t-0 lg:pl-16 lg:pt-0">
        <Reveal delay={120}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4b5c43]">
            Tours depart every 30 minutes
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {EIB.timeSlots.map((slot) => (
              <li
                key={slot}
                className="rounded-full border-2 border-[#4b5c43]/40 px-4 py-1.5 font-eibDisplay text-lg font-bold tabular-nums text-[#4b5c43]"
              >
                {slot}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={220}>
          <ul className="mt-8 space-y-4 text-[15px] leading-relaxed">
            {EIB.goodToKnow.map((note) => (
              <li key={note} className="flex gap-3">
                <span aria-hidden className="mt-2 h-2 w-2 flex-none rotate-45 bg-[#8c3a35]" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

// Phone layout for the at-a-glance cards: a path from the first stop to the
// last that fills as you scroll, lighting up each stop it reaches. Sets --len
// and --p on the wrapper and data-active on each item; wider screens ignore them.
const STOP_CENTER = 36; // px from the top of each item to its dot's centre

const useJourneyPath = (ref: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return undefined;
    const stops = Array.from(wrap.querySelectorAll("li"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return subscribeToFrames(() => {
      const line = still ? Infinity : window.innerHeight * 0.65;
      const centers = stops.map((stop) => stop.getBoundingClientRect().top + STOP_CENTER);
      const first = centers[0] ?? 0;
      const len = (centers[centers.length - 1] ?? first) - first;
      const p = len > 0 ? Math.min(1, Math.max(0, (line - first) / len)) : 1;
      wrap.style.setProperty("--len", `${len}px`);
      wrap.style.setProperty("--p", p.toFixed(4));
      stops.forEach((stop, i) => (stop.dataset.active = String((centers[i] ?? 0) <= line)));
    });
  }, [ref]);
};

const AtAGlance = () => {
  const pathRef = useRef<HTMLDivElement>(null);
  useJourneyPath(pathRef);

  return (
    <section className={`${styles.texture} ${styles.red}`}>
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <Reveal from="left">
          <h2 className="font-eibDisplay text-[clamp(3rem,8vw,5.75rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em]">
            Our event at-
            <br />
            a-glance
          </h2>
        </Reveal>
        <div ref={pathRef} className="relative mt-12 sm:mt-14">
          {/* phone-only path: faint track plus a fill that follows the scroll */}
          <span
            aria-hidden
            className="absolute left-[19px] top-9 h-[var(--len,0px)] w-0.5 bg-[#efe8dc]/25 sm:hidden"
          />
          <span
            aria-hidden
            className={`${styles.scrollFx} absolute left-[19px] top-9 h-[var(--len,0px)] w-0.5 origin-top scale-y-[var(--p,0)] bg-[#efe8dc] sm:hidden`}
          />
          <ol className="grid gap-4 pl-14 sm:grid-cols-2 sm:gap-5 sm:pl-0 lg:grid-cols-4">
            {EIB.glance.map((item, i) => (
              <li key={item.n} className="group/stop relative">
                <span
                  aria-hidden
                  className="absolute left-[-3.5rem] top-4 grid h-10 w-10 place-items-center rounded-full border-2 border-[#efe8dc]/40 bg-[#8c3a35] text-xs font-semibold tabular-nums text-[#efe8dc]/70 transition duration-500 group-data-[active=true]/stop:scale-110 group-data-[active=true]/stop:border-[#efe8dc] group-data-[active=true]/stop:bg-[#efe8dc] group-data-[active=true]/stop:text-[#7d0b0b] sm:hidden"
                >
                  {item.n}
                </span>
                <Reveal delay={i * 120} className="h-full">
                  <div
                    className={`group flex h-full flex-col justify-between gap-3 p-5 shadow-xl transition duration-500 hover:-translate-y-2 hover:rotate-[-1deg] max-sm:opacity-55 max-sm:group-data-[active=true]/stop:opacity-100 sm:min-h-[260px] sm:p-6 lg:min-h-[300px] ${GLANCE_CARD_STYLES[i]}`}
                  >
                    <div>
                      <p className="hidden text-xs tabular-nums sm:block">{item.n}</p>
                      <h3 className="font-eibBody text-[1.6rem] font-light leading-tight tracking-tight sm:mt-1 sm:text-[1.7rem]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed opacity-90">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        {/* the parking card's directions, without cluttering the card */}
        <Reveal delay={500}>
          <p className="mt-8 text-sm text-[#efe8dc]/80">
            <a
              href={EIB.parkingMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              Directions to parking at Winona Vine Estates
            </a>
            {" · "}
            <a
              href={EIB.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              Add to Google Calendar
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Closing = () => (
  <section className={`${styles.texture} ${styles.green}`}>
    <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
      <div>
        <Reveal>
          <h2 className="font-eibDisplay text-[clamp(3rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em]">
            We can&rsquo;t
            <br />
            wait to see
            <br />
            you!
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-10 max-w-md font-eibDisplay text-lg font-semibold uppercase leading-snug tracking-wide">
            If you have any questions or concerns please reach out to our office:
          </p>
          <p className="mt-8 space-y-1 font-eibDisplay text-lg font-bold uppercase tracking-wide">
            <a href={`mailto:${EIB.email}`} className="block hover:underline">
              {EIB.email}
            </a>
            <a href={`tel:${EIB.phone}`} className="block hover:underline">
              {EIB.phone}
            </a>
          </p>
        </Reveal>
      </div>
      <Reveal from="right" delay={200}>
        <div className="relative mx-auto mt-24 max-w-sm bg-[#f6f2ec] md:mt-0 px-8 pb-10 pt-12 text-right text-[#1f1a17] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] transition duration-700 hover:-rotate-1">
          <Candle className="absolute bottom-[calc(100%-6px)] left-8 h-32 w-auto" />
          <p className="font-eibSerif text-lg leading-snug">
            Following our <strong>Evening in Bethlehem</strong> event please join us for
          </p>
          <p className="mt-12 font-eibSerif text-[2.1rem] leading-[1.1]">
            {EIB.christmasEve.title}
          </p>
          <p className="mt-4 font-eibSerif text-xs uppercase tracking-[0.25em]">
            December 24<sup>th</sup> at 6PM
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const VariantFlyer = ({ siteSettings }: EibVariantProps) => (
  <EibShell className="bg-[#4b5c43] text-[#efe8dc]">
    <Hero logoUrl={siteSettings?.logo ? urlFor(siteSettings.logo).width(600).url() : undefined} />
    <WhatToExpect />
    <Register />
    <AtAGlance />
    <Closing />
    <div className={`${styles.texture} ${styles.green}`}>
      <Footer siteSettings={siteSettings} />
    </div>
    <FloatingRegister className="bg-[#efe8dc] text-[#7a1f1a] hover:bg-white" />
  </EibShell>
);

export default VariantFlyer;
