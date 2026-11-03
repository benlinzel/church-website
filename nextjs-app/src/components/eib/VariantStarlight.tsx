// Variant 2: "Follow the star". A night over Bethlehem with multi-plane
// parallax hills, a twinkling sky, and a journey path that draws as you scroll.
import { useRef } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { urlFor } from "@/utils/sanity.client";

import { BethlehemStar, Camel, Candle, Hills, HolyFamily, Sheep, Skyline } from "./art";
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
  styles,
  useCountdown,
  useScrollProgress,
} from "./shared";

// Seeded PRNG so the star field is identical on the server and client.
const mulberry32 = (seed: number) => () => {
  /* eslint-disable no-bitwise, no-param-reassign */
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  /* eslint-enable no-bitwise, no-param-reassign */
};

const STARS = (() => {
  const rand = mulberry32(1212);
  return Array.from({ length: 140 }, () => ({
    left: rand() * 100,
    top: rand() * 70,
    size: rand() < 0.85 ? 1 + rand() * 1.5 : 2.5 + rand() * 1.5,
    dur: 2 + rand() * 4,
    delay: rand() * -6,
    lo: 0.15 + rand() * 0.35,
  }));
})();

const GOLD_TEXT =
  "bg-gradient-to-b from-[#fff3c9] via-[#f1cf78] to-[#c9973b] bg-clip-text text-transparent";

const StarField = () => (
  <div aria-hidden className="absolute inset-0">
    {STARS.map((s, i) => (
      <span
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        className={`${styles.twinkle} absolute rounded-full bg-white`}
        style={{
          left: `${s.left.toFixed(2)}%`,
          top: `${s.top.toFixed(2)}%`,
          width: s.size.toFixed(1) + "px",
          height: s.size.toFixed(1) + "px",
          ...cssVars({
            "--dur": `${s.dur.toFixed(2)}s`,
            "--delay": `${s.delay.toFixed(2)}s`,
            "--lo": s.lo.toFixed(2),
          }),
        }}
      />
    ))}
  </div>
);

const Hero = ({ logoUrl }: { logoUrl?: string }) => {
  const countdown = useCountdown();
  const message = countdownMessage(countdown);

  return (
    <section className="relative flex min-h-[680px] flex-col overflow-hidden bg-gradient-to-b from-[#050a1c] via-[#141c45] to-[#4a2b4c] h-[100svh]">
      <StarField />

      {/* the star stays put while the land scrolls away beneath it */}
      <div
        className={`${styles.parallaxY} absolute right-[4%] top-[60px] w-[110px] md:right-[8%] md:top-[10%] md:w-[34vw] md:min-w-[160px] md:max-w-[320px]`}
        style={cssVars({ "--speed": 0.6 })}
      >
        <BethlehemStar />
      </div>

      {/* parallax planes: further away = closer to a scroll speed of 1 */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]">
        <div className={`${styles.parallaxY} absolute inset-x-0 bottom-[22%]`} style={cssVars({ "--speed": 0.5 })}>
          <Hills variant={0} className="h-40 w-full text-[#2a2c5e] md:h-56" />
        </div>
        <div className={`${styles.parallaxY} absolute inset-x-[-5%] bottom-[18%]`} style={cssVars({ "--speed": 0.35 })}>
          <Skyline className="h-28 w-full text-[#1a1d45] md:h-44" />
        </div>
        <div className={`${styles.parallaxY} absolute inset-x-0 bottom-[6%]`} style={cssVars({ "--speed": 0.2 })}>
          <Hills variant={1} className="h-32 w-full text-[#11143a] md:h-44" />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="relative h-36 md:h-48">
            <div
              className={`${styles.parallaxX} absolute bottom-[38%] left-[6%] w-[28vw] max-w-[300px] min-w-[150px] text-[#070a22]`}
              style={cssVars({ "--speed": 0.35 })}
            >
              <div className={styles.walk}>
                <HolyFamily />
              </div>
            </div>
            <div
              className={`${styles.parallaxX} absolute bottom-[40%] right-[10%] hidden w-[14vw] max-w-[170px] text-[#070a22] sm:block`}
              style={cssVars({ "--speed": -0.2 })}
            >
              <Camel className="-scale-x-100" />
            </div>
            <div className="absolute bottom-[42%] right-[30%] hidden w-[6vw] max-w-[70px] text-[#070a22] md:block">
              <Sheep className="-scale-x-100" />
            </div>
            <Hills variant={2} className="absolute inset-0 h-full w-full text-[#070a22]" />
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <Navbar logoUrl={logoUrl} />
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 pb-[28vh] text-center md:text-left"
        style={{ opacity: "calc(1 - var(--sy, 0) / 520)" }}
      >
        <Reveal from="down">
          <p className="font-eibElegant text-lg uppercase tracking-[0.5em] text-[#f1cf78] md:text-2xl">
            An Evening in
          </p>
        </Reveal>
        <Reveal delay={200} from="zoom">
          <h1 className={`font-eibElegant text-[clamp(4.25rem,14vw,10.5rem)] font-semibold italic leading-[0.9] ${GOLD_TEXT}`}>
            Bethlehem
          </h1>
        </Reveal>
        <Reveal delay={450}>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-[#e8e4f0]/85 md:text-base">
            {EIB.dateLong} · {EIB.time}
          </p>
          <p className="mt-1 text-sm uppercase tracking-[0.3em] text-[#e8e4f0]/60">
            {EIB.venue}
            <span className="hidden md:inline"> · </span>
            <br className="md:hidden" />
            {EIB.street}, {EIB.city}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <FormLink className="rounded-full bg-gradient-to-b from-[#f7dc8f] to-[#d6a548] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#1a1430] shadow-[0_0_40px_rgba(241,207,120,0.35)] transition hover:shadow-[0_0_60px_rgba(241,207,120,0.6)]">
              Reserve your spot
            </FormLink>
            <a
              href="#journey"
              className="rounded-full border border-[#f1cf78]/50 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-[#f1cf78] transition hover:bg-[#f1cf78]/10"
            >
              Follow the star ↓
            </a>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center">
        {message ? (
          <p className="text-sm uppercase tracking-[0.3em] text-[#f1cf78]">{message}</p>
        ) : (
          <div className="flex gap-6 rounded-full bg-black/30 px-6 py-2 backdrop-blur-sm">
            {countdownUnits(countdown).map((u) => (
              <p key={u.label} className="text-center text-[#e8e4f0]">
                <span className="block font-eibElegant text-2xl font-semibold tabular-nums leading-none text-[#f1cf78]">
                  {u.value}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] opacity-70">{u.label}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Story = () => (
  <section className="relative overflow-hidden bg-[#070a22] py-24 md:py-32">
    <div className="mx-auto grid max-w-[1200px] items-center gap-16 px-6 md:grid-cols-2">
      <div>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#f1cf78]">What to expect</p>
          <h2 className="mt-4 font-eibElegant text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] text-[#f6f1e4]">
            Walk the road to Bethlehem with Mary &amp; Joseph.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 text-lg leading-relaxed text-[#e8e4f0]/80">{EIB.intro}</p>
        </Reveal>
      </div>
      <ul className="grid grid-cols-2 gap-4">
        {EIB.highlights.map((h, i) => (
          <li key={h.label}>
            <Reveal delay={i * 120} from="zoom" className="h-full">
              <div className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-2xl border border-[#f1cf78]/25 bg-white/[0.03] p-6 text-center transition duration-500 hover:border-[#f1cf78]/60 hover:shadow-[0_0_40px_rgba(241,207,120,0.15)] md:min-h-[200px]">
                <p className={`font-eibElegant text-5xl font-semibold italic leading-none md:text-6xl ${GOLD_TEXT}`}>
                  {h.big}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#e8e4f0]/75">{h.label}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// Each stop lights up once the path reaches it (row midpoints at 1/8, 3/8...).
const stopLight = (i: number) =>
  cssVars({ "--t": (i + 0.5) / EIB.glance.length });
const LIT = "clamp(0.25, calc((var(--p, 0) - var(--t)) * 25 + 1), 1)";

const Journey = () => {
  const ref = useRef<HTMLOListElement>(null);
  useScrollProgress(ref, "center");

  return (
    <section id="journey" className="relative bg-gradient-to-b from-[#070a22] via-[#0f1438] to-[#070a22] py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#f1cf78]">Our event at a glance</p>
          <h2 className="mt-4 font-eibElegant text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[#f6f1e4]">
            Your journey, step by step
          </h2>
        </Reveal>

        <ol ref={ref} className="relative mt-16">
          {/* desktop: a winding road down the middle */}
          <svg
            aria-hidden
            viewBox="0 0 200 1000"
            preserveAspectRatio="none"
            className="absolute left-1/2 top-0 hidden h-full w-[200px] -translate-x-1/2 md:block"
            fill="none"
          >
            <path
              d="M100 0 L100 125 C100 200 170 210 170 250 C170 290 100 300 100 375 C100 450 30 460 30 500 C30 540 100 550 100 625 C100 700 170 710 170 750 C170 790 100 800 100 875 L100 1000"
              stroke="#f1cf78"
              strokeOpacity="0.15"
              strokeWidth="3"
              strokeDasharray="2 10"
            />
            <path
              d="M100 0 L100 125 C100 200 170 210 170 250 C170 290 100 300 100 375 C100 450 30 460 30 500 C30 540 100 550 100 625 C100 700 170 710 170 750 C170 790 100 800 100 875 L100 1000"
              pathLength={1}
              className={styles.drawPath}
              stroke="#f1cf78"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(241,207,120,0.8))" }}
            />
          </svg>
          {/* mobile: a straight rail */}
          <div aria-hidden className="absolute bottom-0 left-[15px] top-0 w-px bg-[#f1cf78]/15 md:hidden">
            <div
              className={`${styles.scrollFx} h-full w-full origin-top bg-[#f1cf78]`}
              style={{ transform: "scaleY(var(--p, 0))" }}
            />
          </div>

          {EIB.glance.map((item, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={item.n}
                className="relative grid items-center py-6 pl-12 md:h-[300px] md:grid-cols-[1fr_200px_1fr] md:py-0 md:pl-0"
                style={stopLight(i)}
              >
                <span
                  aria-hidden
                  className="absolute left-[15px] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f1cf78] shadow-[0_0_30px_8px_rgba(241,207,120,0.55)] transition-opacity md:left-1/2"
                  style={{ opacity: LIT }}
                />
                <div
                  className={`${right ? "md:col-start-3" : "md:col-start-1 md:text-right"} md:row-start-1`}
                  style={{ opacity: LIT }}
                >
                  <p className="font-eibElegant text-5xl font-semibold text-[#f1cf78]/70">{item.n}</p>
                  <h3 className="mt-1 font-eibElegant text-3xl font-medium text-[#f6f1e4] md:text-4xl">
                    {item.title}
                  </h3>
                  <p className={`mt-3 max-w-sm leading-relaxed text-[#e8e4f0]/80 ${right ? "" : "md:ml-auto"}`}>
                    {item.body}
                  </p>
                  {i === 0 && (
                    <a
                      href={EIB.parkingMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-[#f1cf78] underline underline-offset-4"
                    >
                      Directions to parking
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

const Register = () => (
  <section
    id="register"
    className="relative scroll-mt-4 overflow-x-clip bg-[#070a22] py-24 md:py-32"
  >
    <div aria-hidden className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#f1cf78]/10 blur-3xl" />
    <div className="relative mx-auto max-w-[1200px] px-6">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#f1cf78]">Free · Registration required</p>
        <h2 className={`mt-4 font-eibElegant text-[clamp(2.75rem,7vw,5.5rem)] font-semibold italic leading-none ${GOLD_TEXT}`}>
          Reserve your place
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#e8e4f0]/75">
          Choose a 30-minute window and we&rsquo;ll send your exact start time by email.
        </p>
        <FormLink className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#f7dc8f] to-[#d6a548] px-10 py-5 text-base font-semibold uppercase tracking-[0.2em] text-[#1a1430] shadow-[0_0_50px_rgba(241,207,120,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_0_80px_rgba(241,207,120,0.65)]">
          Register now <span aria-hidden>↗</span>
        </FormLink>
        <p className="mt-3 text-xs text-[#e8e4f0]/50">Opens our Google Form in a new tab</p>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-[1000px] gap-6 md:grid-cols-[1fr_1.3fr]">
        <Reveal from="left">
          <div className="h-full rounded-2xl border border-[#f1cf78]/25 bg-white/[0.03] p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-[#f1cf78]">Departures</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {EIB.timeSlots.map((slot, i) => (
                <li
                  key={slot}
                  className="rounded-lg border border-[#f1cf78]/20 bg-[#f1cf78]/[0.06] py-3 text-center font-eibElegant text-2xl font-semibold tabular-nums text-[#f6f1e4]"
                >
                  <span className={styles.twinkle} style={cssVars({ "--lo": 0.75, "--dur": "3s", "--delay": `${i * -0.5}s` })}>
                    {slot}
                  </span>
                  <span className="ml-1 text-xs text-[#e8e4f0]/50">PM</span>
                </li>
              ))}
            </ul>
            <a href={EIB.calendarUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm text-[#f1cf78] underline underline-offset-4">
              Add to calendar
            </a>
          </div>
        </Reveal>
        <Reveal from="right" delay={120}>
          <div className="h-full rounded-2xl border border-[#f1cf78]/25 bg-white/[0.03] p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-[#f1cf78]">Good to know</p>
            <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#e8e4f0]/80">
              {EIB.goodToKnow.map((note) => (
                <li key={note} className="flex gap-3">
                  <span aria-hidden className="text-[#f1cf78]">✦</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const CANDLES = [
  { h: "h-28", delay: 0 },
  { h: "h-40", delay: 300 },
  { h: "h-52", delay: 700 },
  { h: "h-40", delay: 200 },
  { h: "h-28", delay: 500 },
];

const ChristmasEve = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-[#070a22] to-[#1a0f1a] pb-16 pt-24 md:pt-32">
    <div className="mx-auto max-w-[900px] px-6 text-center">
      <Reveal>
        <div className="flex items-end justify-center gap-3 sm:gap-6" aria-hidden>
          {CANDLES.map((c, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Candle key={i} delay={c.delay} className={`${c.h} w-auto`} />
          ))}
        </div>
      </Reveal>
      <Reveal delay={150}>
        <p className="mt-10 font-eibElegant text-xl italic text-[#e8e4f0]/80">{EIB.christmasEve.lead}</p>
        <h2 className={`mt-3 font-eibElegant text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-tight ${GOLD_TEXT}`}>
          {EIB.christmasEve.title}
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.35em] text-[#e8e4f0]/70">{EIB.christmasEve.when}</p>
      </Reveal>
      <Reveal delay={250}>
        <div className="mx-auto mt-20 max-w-lg border-t border-[#f1cf78]/20 pt-10">
          <p className="font-eibElegant text-3xl text-[#f6f1e4]">We can&rsquo;t wait to see you!</p>
          <p className="mt-3 text-[#e8e4f0]/70">Questions or concerns? Reach out to our office:</p>
          <p className="mt-4 flex flex-col items-center gap-1 text-[#f1cf78] sm:flex-row sm:justify-center sm:gap-6">
            <a href={`mailto:${EIB.email}`} className="hover:underline">{EIB.email}</a>
            <a href={`tel:${EIB.phone}`} className="hover:underline">{EIB.phone}</a>
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const VariantStarlight = ({ siteSettings, noindex }: EibVariantProps) => (
  <EibShell noindex={noindex} className="bg-[#070a22] text-[#e8e4f0]">
    <Hero logoUrl={siteSettings?.logo ? urlFor(siteSettings.logo).width(600).url() : undefined} />
    <Story />
    <Journey />
    <Register />
    <ChristmasEve />
    <div className="bg-[#1a0f1a]">
      <Footer siteSettings={siteSettings} />
    </div>
    <FloatingRegister className="bg-gradient-to-b from-[#f7dc8f] to-[#d6a548] text-[#1a1430]" />
  </EibShell>
);

export default VariantStarlight;
