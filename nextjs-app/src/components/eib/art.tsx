// SVG art for the Evening in Bethlehem pages. Everything uses currentColor so
// callers set the colour with a text-* class.
import { useId } from "react";

import styles from "./eib.module.css";
import { CAMEL, DONKEY, SHEEP, type Silhouette } from "./silhouettes";

type ArtProps = { className?: string };

const useSvgId = () => useId().replace(/[^a-zA-Z0-9]/g, "");

const SilhouetteSvg = ({ art, className }: ArtProps & { art: Silhouette }) => (
  <svg viewBox={art.viewBox} className={className} fill="currentColor" aria-hidden>
    <g transform={art.transform}>
      {art.paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </g>
  </svg>
);

// Silhouettes are opaque; fade them with opacity on a wrapper rather than a
// translucent text colour, so overlapping animals don't darken each other.
export const Donkey = ({ className }: ArtProps) => <SilhouetteSvg art={DONKEY} className={className} />;
export const Sheep = ({ className }: ArtProps) => <SilhouetteSvg art={SHEEP} className={className} />;
export const Camel = ({ className }: ArtProps) => <SilhouetteSvg art={CAMEL} className={className} />;

export const Candle = ({ className, delay = 0 }: ArtProps & { delay?: number }) => {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 80 200" className={className} aria-hidden>
      <defs>
        <radialGradient id={`flameGlow${id}`}>
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`flame${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ff9a3c" />
          <stop offset="55%" stopColor="#ffd36b" />
          <stop offset="100%" stopColor="#fff6d8" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="48" r="40" fill={`url(#flameGlow${id})`} className={styles.glow} />
      <g className={styles.flame} style={{ animationDelay: `${delay}ms` }}>
        <path
          d="M40 18 Q54 40 48 56 Q44 66 40 66 Q36 66 32 56 Q26 40 40 18 Z"
          fill={`url(#flame${id})`}
        />
      </g>
      <rect x="39" y="62" width="2" height="10" fill="#3a2a1a" />
      <rect x="26" y="70" width="28" height="122" rx="3" fill="#f6efe2" />
      <path d="M26 74 Q34 80 34 92 Q36 80 42 76 Q46 86 48 80 Q52 74 54 74 L54 70 L26 70 Z" fill="#fffaf1" />
    </svg>
  );
};
