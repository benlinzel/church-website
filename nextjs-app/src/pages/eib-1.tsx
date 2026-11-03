import VariantFlyer from "@/components/eib/VariantFlyer";
import { type EibVariantProps, getEibStaticProps } from "@/components/eib/shared";

// Design option 1 for /eib. Not indexed while the variants are under review.
const EveningInBethlehem1 = (props: EibVariantProps) => <VariantFlyer {...props} noindex />;

export const getStaticProps = getEibStaticProps;

export default EveningInBethlehem1;
