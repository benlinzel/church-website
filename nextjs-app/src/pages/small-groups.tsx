import PageLayout from "@/components/PageLayout";
import client, { fetchSiteSettings } from "@/utils/sanity.client";

const SmallGroups = (props: any) => {
  return (
    <PageLayout siteSettings={props.siteSettings} title="Small Groups">
      <div className="divide-y divide-white/10">
        {props.smallGroups
          .filter((smallGroup: any) => smallGroup.title)
          .map((smallGroup: any) => {
            return (
              <section key={smallGroup._id} className="space-y-1 py-8 first:pt-0">
                <h2 className="pb-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                  {smallGroup.title}
                </h2>
                {smallGroup.contact && <p>Contact: {smallGroup.contact}</p>}
                {smallGroup.time && <p className="text-amber-500">Time: {smallGroup.time}</p>}
                {smallGroup.location && <p>Location: {smallGroup.location}</p>}
                {smallGroup.description && (
                  <p className="!mt-3 border-l-2 border-l-amber-500 pl-3 text-sm italic text-white/80">
                    {smallGroup.description}
                  </p>
                )}
              </section>
            );
          })}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const siteSettings = await fetchSiteSettings();
  const smallGroups = await client.fetch(`*[_type == "smallGroup"] | order(order asc)`);
  return {
    props: {
      siteSettings,
      smallGroups,
    },
  };
}

export default SmallGroups;
