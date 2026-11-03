import EibEnded from "@/components/eib/EibEnded";
import VariantFlyer from "@/components/eib/VariantFlyer";
import { type EibVariantProps, getEibStaticProps } from "@/components/eib/shared";
import { EibOverScript, HIDE_WHEN_OVER, useEibOver } from "@/components/eib/timing";

// Evening in Bethlehem. Shows a thank-you page instead once the event is over.
const EveningInBethlehem = (props: EibVariantProps) => {
  const over = useEibOver(props.builtOver);

  if (over) return <EibEnded siteSettings={props.siteSettings} />;

  return (
    <>
      <EibOverScript />
      <div className={HIDE_WHEN_OVER}>
        <VariantFlyer {...props} />
      </div>
    </>
  );
};

export const getStaticProps = getEibStaticProps;

export default EveningInBethlehem;
