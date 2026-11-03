import CopyText from "@/components/CopyText";
import PageLayout from "@/components/PageLayout";
import { fetchSiteSettings } from "@/utils/sanity.client";

const Giving = (props: any) => {
  return (
    <PageLayout siteSettings={props.siteSettings} title="Giving">
      <div className="py-8 text-center">
        <p className="font-display text-2xl font-medium text-white">
          We can only accept Interac E-Transfers at this time.
        </p>
        <p className="mt-6">Please send E-Transfer donations to:</p>
        <p className="mt-2 text-xl font-medium text-amber-500">
          <CopyText text={props.siteSettings.etransferEmail} />
        </p>
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const siteSettings = await fetchSiteSettings();
  return {
    props: {
      siteSettings,
    },
  };
}

export default Giving;
