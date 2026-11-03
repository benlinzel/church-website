import VariantFlyer from "@/components/eib/VariantFlyer";
import { type EibVariantProps, getEibStaticProps } from "@/components/eib/shared";

// Evening in Bethlehem. Swap the component for VariantStarlight to promote the
// other design (see /eib-1 and /eib-2).
const EveningInBethlehem = (props: EibVariantProps) => <VariantFlyer {...props} />;

export const getStaticProps = getEibStaticProps;

export default EveningInBethlehem;
