import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import client from "@/utils/sanity.client";

import { EIB } from "./content";
import styles from "./eib.module.css";
import { eibFontVars } from "./fonts";

export { styles };

export async function getEibStaticProps() {
  const siteSettings = await client
    .fetch(`*[_id == "siteSettings"]`)
    .then((settings: any[]) => {
      return settings[0];
    });
  return {
    props: {
      siteSettings,
    },
  };
}

export interface EibVariantProps {
  siteSettings: any;
}

// Typed helper for inline CSS custom properties.
export const cssVars = (vars: Record<string, string | number>) =>
  vars as CSSProperties;

const subscribeToFrames = (update: () => void) => {
  let raf = 0;
  const onChange = () => {
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    }
  };
  update();
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
    cancelAnimationFrame(raf);
  };
};

// Writes window.scrollY to --sy on <html> so parallax can be pure CSS.
const useGlobalScrollVar = () => {
  useEffect(() => {
    const root = document.documentElement;
    const unsubscribe = subscribeToFrames(() =>
      root.style.setProperty("--sy", String(Math.round(window.scrollY))),
    );
    return () => {
      unsubscribe();
      root.style.removeProperty("--sy");
    };
  }, []);
};

/**
 * Writes the element's scroll progress (0..1) to --p: 0 when the top enters
 * the viewport, 1 when the bottom leaves.
 */
export const useScrollProgress = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    return subscribeToFrames(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (rect.height + vh);
      const p = Math.min(1, Math.max(0, raw));
      el.style.setProperty("--p", p.toFixed(4));
    });
  }, [ref]);
};

const revealFrom = {
  up: styles.fromUp,
  down: styles.fromDown,
  left: styles.fromLeft,
  right: styles.fromRight,
  zoom: styles.fromZoom,
  fade: styles.fromFade,
};

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  from = "up",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: keyof typeof revealFrom;
  style?: CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${revealFrom[from]} ${className}`}
      data-shown={shown}
      style={{ ...cssVars({ "--d": `${delay}ms` }), ...style }}
    >
      {children}
    </div>
  );
};

// Splits text into letters that rise in on load (see .letter). Letters are
// grouped per word so lines only wrap between words.
export const RisingText = ({
  text,
  offset = 0,
}: {
  text: string;
  offset?: number;
}) => {
  let index = offset;
  return (
    <span aria-label={text}>
      {text.split(" ").map((word, w) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split("").map((char, i) => {
            index += 1;
            return (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={styles.letter}
                style={cssVars({ "--i": index })}
              >
                {char}
              </span>
            );
          })}
          {w < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
};

type Countdown =
  | { state: "before"; days: number; hours: number; minutes: number; seconds: number }
  | { state: "live" | "after" };

// Client-only (null during SSR) so the static HTML doesn't bake in a stale time.
export const useCountdown = () => {
  const [value, setValue] = useState<Countdown | null>(null);

  useEffect(() => {
    const start = new Date(EIB.startsAt).getTime();
    const end = new Date(EIB.endsAt).getTime();
    const tick = () => {
      const now = Date.now();
      if (now >= end) return setValue({ state: "after" });
      if (now >= start) return setValue({ state: "live" });
      const s = Math.floor((start - now) / 1000);
      return setValue({
        state: "before",
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        minutes: Math.floor((s % 3600) / 60),
        seconds: s % 60,
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return value;
};

export const countdownUnits = (c: Countdown | null) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  if (!c || c.state !== "before") {
    return [
      { label: "Days", value: "--" },
      { label: "Hours", value: "--" },
      { label: "Minutes", value: "--" },
      { label: "Seconds", value: "--" },
    ];
  }
  return [
    { label: "Days", value: String(c.days) },
    { label: "Hours", value: pad(c.hours) },
    { label: "Minutes", value: pad(c.minutes) },
    { label: "Seconds", value: pad(c.seconds) },
  ];
};

export const countdownMessage = (c: Countdown | null) => {
  if (c?.state === "live") return "Happening now. Come find us on Glover Rd!";
  if (c?.state === "after") return "Thank you to everyone who journeyed with us!";
  return null;
};

// Registration happens on the Google Form itself, opened in a new tab.
export const FormLink = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <a href={EIB.formUrl} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
    <span className="sr-only"> (opens the registration form in a new tab)</span>
  </a>
);

// Pill that follows the visitor down the page, linking straight to the form.
// Hidden while the #register section (which has its own button) is on screen.
export const FloatingRegister = ({
  className = "",
  label = "Reserve your spot",
}: {
  className?: string;
  label?: string;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("register");
    let pastHero = false;
    let registerInView = false;
    const sync = () => setVisible(pastHero && !registerInView);

    const observer = target
      ? new IntersectionObserver(([entry]) => {
          registerInView = Boolean(entry?.isIntersecting);
          sync();
        })
      : null;
    if (target) observer?.observe(target);

    const unsubscribe = subscribeToFrames(() => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      sync();
    });
    return () => {
      observer?.disconnect();
      unsubscribe();
    };
  }, []);

  return (
    <a
      href={EIB.formUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider shadow-2xl transition-all duration-500 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      } ${className}`}
    >
      {label}
      <span className="sr-only"> (opens the registration form in a new tab)</span>
    </a>
  );
};

export const EibShell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  useGlobalScrollVar();
  const { pathname } = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const description = `${EIB.tagline} at ${EIB.venue}, ${EIB.dateLong}, ${EIB.time}. Free. Registration required.`;

  return (
    <div className={`${eibFontVars} overflow-x-clip font-eibBody ${className}`}>
      <NextSeo
        title={`${EIB.title} | ${EIB.dateShort}`}
        description={description}
        // The design uses fixed light and dark colours. Stop browsers that
        // force a dark theme (Brave Night Mode, Chrome/Samsung "darken
        // websites", Dark Reader) from repainting the cream sections.
        additionalMetaTags={[
          { name: "color-scheme", content: "only light" },
          { name: "darkreader-lock", content: "" },
        ]}
        // url overrides the homepage og:url set by DefaultSeo, otherwise
        // Facebook treats a shared /eib link as the homepage.
        openGraph={{
          url: `${siteUrl}${pathname}`,
          title: EIB.title,
          description,
          images: [
            {
              url: `${siteUrl}${EIB.images.share}`,
              width: 1200,
              height: 630,
              alt: `${EIB.title}, ${EIB.dateLong}, ${EIB.time} at ${EIB.venue}`,
            },
          ],
        }}
        twitter={{ cardType: "summary_large_image" }}
      />
      <noscript>
        <style>{`.${styles.reveal},.${styles.letter}{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      {children}
    </div>
  );
};
