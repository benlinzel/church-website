import { Cormorant_Garamond, Mulish } from "next/font/google";

// Site-wide fonts. Tailwind's font-display (headings) and font-sans (text)
// read --font-display and --font-body; SITE_FONTS points those at these
// faces. The event pages point them at their own fonts instead (see
// components/eib/fonts.ts), and the navbar and footer reapply SITE_FONTS so
// the site's frame looks the same everywhere.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-site-display",
  display: "swap",
});

const body = Mulish({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-site-body",
  display: "swap",
});

export const siteFontVars = `${display.variable} ${body.variable}`;

export const SITE_FONTS =
  "[--font-display:var(--font-site-display)] [--font-body:var(--font-site-body)] font-sans lining-nums";
