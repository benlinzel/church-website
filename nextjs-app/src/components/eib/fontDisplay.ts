import { Inter_Tight } from "next/font/google";

// Split out from fonts.ts so the homepage banner can load just this one font.
export const eibDisplayFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-eib-display",
  display: "swap",
});
