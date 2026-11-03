import { Inter_Tight, Lora, Work_Sans } from "next/font/google";

// Fonts for the Evening in Bethlehem pages and the homepage banner. EIB_FONTS
// points Tailwind's font-display and font-sans at them for everything inside.
const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-eib-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  variable: "--font-eib-body",
  display: "swap",
});

// Not preloaded: it's only used far down the page, and preloading would also
// pull it into the homepage, which shares the event page's CSS for the banner.
const serif = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-eib-serif",
  display: "swap",
  preload: false,
});

export const EIB_FONTS = `${display.variable} ${body.variable} ${serif.variable} [--font-display:var(--font-eib-display)] [--font-body:var(--font-eib-body)] font-sans`;

// Just the banner's faces (no serif), so the homepage loads two fonts, not three.
export const EIB_BANNER_FONTS = `${display.variable} ${body.variable} [--font-display:var(--font-eib-display)] [--font-body:var(--font-eib-body)] font-sans`;
