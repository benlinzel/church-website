// SVG art for the Evening in Bethlehem pages. Everything uses currentColor so
// callers set the colour with a text-* class.
import { useId } from "react";

import styles from "./eib.module.css";
import { CAMEL, DONKEY, SHEEP, type Silhouette } from "./silhouettes";

type ArtProps = { className?: string };

const useSvgId = () => useId().replace(/[^a-zA-Z0-9]/g, "");

const SilhouetteSvg = ({
  art,
  className,
  ...position
}: ArtProps & { art: Silhouette; x?: number; y?: number; width?: number }) => (
  <svg viewBox={art.viewBox} className={className} fill="currentColor" aria-hidden {...position}>
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

// Joseph leading Mary on the donkey, for the caravan.
export const HolyFamily = ({ className }: ArtProps) => (
  <svg viewBox="0 0 260 180" className={className} fill="currentColor" aria-hidden>
    {/* Joseph with staff */}
    <circle cx="40" cy="38" r="11" />
    <path d="M28 52 Q40 46 52 52 L58 120 Q46 126 34 124 L22 124 Z" />
    <path d="M30 124 L28 172 L36 172 L40 124 Z M44 124 L50 172 L58 172 L52 122 Z" />
    <rect x="10" y="30" width="3.5" height="142" rx="1.5" transform="rotate(-6 12 100)" />
    <path d="M50 64 Q62 74 58 88 L52 86 Q54 76 46 70 Z" />
    <SilhouetteSvg art={DONKEY} x={62} y={36} width={170} />
    {/* Mary seated */}
    <circle cx="158" cy="50" r="9" />
    <path d="M145 62 Q158 54 171 63 L176 94 Q158 100 140 94 Z" />
  </svg>
);

// Flat-roofed town with domes and palms. Deterministic so SSR matches.
const BUILDINGS: [number, number, number, boolean][] = [
  [0, 70, 60, false], [62, 50, 92, false], [104, 80, 70, true], [176, 44, 120, false],
  [214, 90, 82, false], [296, 60, 104, true], [350, 40, 150, false], [384, 110, 76, false],
  [486, 70, 118, true], [550, 54, 88, false], [598, 96, 64, false], [688, 46, 132, false],
  [728, 84, 96, true], [806, 62, 72, false], [862, 40, 112, false], [896, 104, 84, false],
  [994, 66, 124, true], [1054, 58, 78, false], [1106, 94, 98, false],
];
const PALMS = [150, 460, 780, 1040];

export const Skyline = ({ className }: ArtProps) => (
  <svg
    viewBox="0 0 1200 220"
    preserveAspectRatio="xMidYMax slice"
    className={className}
    fill="currentColor"
    aria-hidden
  >
    {BUILDINGS.map(([x, w, h, dome]) => (
      <g key={x}>
        <rect x={x} y={220 - h} width={w} height={h} />
        {dome && (
          <path
            d={`M${x + w * 0.15} ${220 - h} A ${w * 0.35} ${w * 0.35} 0 0 1 ${x + w * 0.85} ${220 - h} Z`}
          />
        )}
      </g>
    ))}
    {PALMS.map((x) => (
      <g key={`palm${x}`}>
        <path d={`M${x} 220 Q${x + 6} 160 ${x - 4} 100 L${x + 2} 100 Q${x + 14} 160 ${x + 8} 220 Z`} />
        <path d={`M${x - 1} 102 Q${x - 30} 84 ${x - 54} 104 Q${x - 26} 90 ${x - 1} 106 Z`} />
        <path d={`M${x + 1} 102 Q${x + 32} 82 ${x + 56} 100 Q${x + 28} 90 ${x + 1} 106 Z`} />
        <path d={`M${x} 100 Q${x - 14} 70 ${x - 36} 66 Q${x - 12} 78 ${x - 2} 104 Z`} />
        <path d={`M${x} 100 Q${x + 18} 68 ${x + 40} 68 Q${x + 14} 78 ${x + 2} 104 Z`} />
      </g>
    ))}
  </svg>
);

export const Hills = ({
  className,
  variant = 0,
}: ArtProps & { variant?: 0 | 1 | 2 }) => {
  const paths = [
    "M0 120 Q150 60 320 100 T640 90 T960 110 T1200 80 V220 H0 Z",
    "M0 150 Q200 100 420 140 T820 120 T1200 140 V220 H0 Z",
    "M0 170 Q260 130 520 170 T1000 160 T1200 150 V220 H0 Z",
  ];
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d={paths[variant]} />
    </svg>
  );
};

export const BethlehemStar = ({ className }: ArtProps) => {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id={`halo${id}`}>
          <stop offset="0%" stopColor="#fff7dc" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#f6d77a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f6d77a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill={`url(#halo${id})`} className={styles.glow} />
      <path
        d="M100 10 L106 92 L190 100 L106 108 L100 196 L94 108 L10 100 L94 92 Z"
        fill="#fffaf0"
      />
      <path
        d="M100 52 L104 96 L148 100 L104 104 L100 148 L96 104 L52 100 L96 96 Z"
        fill="#fffaf0"
        transform="rotate(45 100 100)"
        opacity="0.8"
      />
    </svg>
  );
};

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
