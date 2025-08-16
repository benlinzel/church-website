import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { client, urlFor } from "@/utils/SanityConfig";

const SmallGroups = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90 ">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="min-h-[500px] bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="py-4 text-center text-4xl font-semibold text-white md:text-5xl">
          Small Groups
        </p>
        <div className="mx-auto max-w-[900px] space-y-8 px-8 pb-8">
          {props.smallGroups
            .filter((smallGroup: any) => smallGroup.title)
            .map((smallGroup: any) => {
              return (
                <div
                  key={`${smallGroup.order}-${smallGroup.title}`}
                  className="space-y-1"
                >
                  <p className="text-3xl text-white">{smallGroup.title}</p>
                  {smallGroup.contact && (
                    <p className="text-base text-white/80">
                      Contact: {smallGroup.contact}
                    </p>
                  )}
                  {smallGroup.time && (
                    <p className="text-base text-amber-500">
                      Time: {smallGroup.time}
                    </p>
                  )}
                  {smallGroup.location && (
                    <p className="text-base text-white/80">
                      Location: {smallGroup.location}
                    </p>
                  )}
                  <p className="border-l-2 border-l-amber-500 pl-2 text-sm italic text-white/80">
                    {smallGroup.description}
                  </p>
                  <hr className="mt-4 opacity-20" />
                </div>
              );
            })}
        </div>
      </div>
      <Footer siteSettings={props.siteSettings} />
    </div>
  );
};

export async function getStaticProps() {
  const siteSettings = await client
    .fetch(`*[_id == "siteSettings"]`)
    .then((settings: any[]) => {
      return settings[0];
    });
  const smallGroups = await client.fetch(
    `*[_type == "smallGroup"] | order(order asc)`
  );
  return {
    props: {
      siteSettings,
      smallGroups,
    },
    // revalidate: 60,
  };
}

export default SmallGroups;
