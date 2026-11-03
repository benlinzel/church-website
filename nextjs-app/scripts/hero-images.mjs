// Makes the homepage photo's responsive sizes (AVIF and WebP) from the
// original. Rerun after replacing the photo: node scripts/hero-images.mjs
// The widths must match HERO_WIDTHS in src/pages/index.tsx.
import {createRequire} from 'node:module'
import {mkdirSync} from 'node:fs'

// sharp comes with next; resolve it from there rather than adding a dependency
const sharp = createRequire(createRequire(import.meta.url).resolve('next/package.json'))('sharp')

const SOURCE = 'public/assets/images/pulpit-short.webp'
const OUT = 'public/assets/images/hero'
const WIDTHS = [640, 960, 1280, 1920, 2560]

mkdirSync(OUT, {recursive: true})
for (const width of WIDTHS) {
  const image = sharp(SOURCE).resize({width})
  await image.clone().avif({quality: 50}).toFile(`${OUT}/pulpit-${width}.avif`)
  await image.clone().webp({quality: 72}).toFile(`${OUT}/pulpit-${width}.webp`)
}
console.log(`wrote ${WIDTHS.length * 2} files to ${OUT}`)
