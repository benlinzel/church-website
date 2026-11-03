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
        <p className="mt-1 text-xl font-medium text-amber-500">
          <a href={`mailto:${props.siteSettings.etransferEmail}`} className="hover:underline">
            {props.siteSettings.etransferEmail}
          </a>
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
