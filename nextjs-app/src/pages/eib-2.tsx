import VariantStarlight from "@/components/eib/VariantStarlight";
import { type EibVariantProps, getEibStaticProps } from "@/components/eib/shared";

// Design option 2 for /eib. Not indexed while the variants are under review.
const EveningInBethlehem2 = (props: EibVariantProps) => <VariantStarlight {...props} noindex />;

export const getStaticProps = getEibStaticProps;

export default EveningInBethlehem2;
