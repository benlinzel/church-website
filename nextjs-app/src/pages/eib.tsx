import VariantFlyer from "@/components/eib/VariantFlyer";
import { type EibVariantProps, getEibStaticProps } from "@/components/eib/shared";

const EveningInBethlehem = (props: EibVariantProps) => <VariantFlyer {...props} />;

export const getStaticProps = getEibStaticProps;

export default EveningInBethlehem;
