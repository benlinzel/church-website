import { Lora, Work_Sans } from "next/font/google";

import { eibDisplayFont } from "./fontDisplay";

const serif = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-eib-serif",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  variable: "--font-eib-body",
  display: "swap",
});

export const eibFontVars = [eibDisplayFont, serif, body]
  .map((font) => font.variable)
  .join(" ");
