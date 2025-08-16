import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { client, urlFor } from "@/utils/SanityConfig";

const Giving = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="min-h-[500px] bg-gradient-to-r from-stone-800 to-stone-900 text-white/80">
        <p className="py-4 text-center text-4xl font-semibold text-white md:text-5xl">
          Giving
        </p>
        <div className="py-16">
          <p className="px-8 pb-4 text-center text-2xl">
            We can only accept Interac E-Transfers at this time.
          </p>
          <p className="px-8 text-center">
            Please send E-Transfer donations to:
          </p>
          <p className="text-center text-xl font-medium text-amber-500">
            {props.siteSettings.etransferEmail}
          </p>
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
  return {
    props: {
      siteSettings,
    },
    // revalidate: 60,
  };
}

export default Giving;
