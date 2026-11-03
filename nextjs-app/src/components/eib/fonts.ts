import { Cormorant_Garamond, Lora, Work_Sans } from "next/font/google";

import { eibDisplayFont } from "./fontDisplay";

const serif = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-eib-serif",
  display: "swap",
});

const elegant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eib-elegant",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  variable: "--font-eib-body",
  display: "swap",
});

export const eibFontVars = [eibDisplayFont, serif, elegant, body]
  .map((font) => font.variable)
  .join(" ");
