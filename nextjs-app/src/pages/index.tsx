import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import HomeBanner from "@/components/eib/HomeBanner";
import { isEibOver } from "@/components/eib/timing";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AppConfig } from "@/utils/AppConfig";
import { myPortableTextComponentsNoMargin } from "@/utils/SanityConfig";
import client, { fetchSiteSettings, urlFor } from "@/utils/sanity.client";

interface UpcomingEventProps {
  title: string;
  date: Date;
  description: any;
}

const UpcomingEvent = (props: UpcomingEventProps) => {
  return (
    <div className="rounded-xl bg-white/5 p-6 text-center ring-1 ring-white/10">
      <h3 className="font-display text-xl font-semibold text-white">{props.title}</h3>
      <p className="mt-1 pb-3 text-amber-500">
        {new Date(props.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        })}
      </p>
      <PortableText value={props.description} components={myPortableTextComponentsNoMargin} />
    </div>
  );
};

const MediaLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <Link
    href={href}
    className="inline-flex items-center gap-3 rounded-full bg-stone-900/80 px-6 py-3 text-lg font-medium text-white shadow-xl ring-1 ring-white/15 backdrop-blur transition hover:-translate-y-0.5 hover:text-amber-500 hover:ring-amber-500/60 md:text-xl"
  >
    {label}
    <Image src={icon} alt="" width={32} height={32} className="h-7 w-7 md:h-8 md:w-8" unoptimized />
  </Link>
);

const Index = (props: any) => {
  const { siteSettings } = props;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 text-white/90">
      <section className="bg-[url('/assets/images/pulpit-short.webp')] bg-cover bg-center bg-no-repeat">
        <div className="flex min-h-[75svh] flex-col bg-gradient-to-b from-black/50 via-black/40 to-black/60 sm:min-h-[560px] md:min-h-[680px] xl:min-h-[800px]">
          <Navbar logoUrl={urlFor(siteSettings.logo).width(600).url()} />
          <div className="mx-auto flex w-full max-w-[1200px] grow flex-col items-center justify-center px-6 pb-16 text-center">
            <h1 className="max-w-3xl font-display text-4xl font-bold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl">
              {siteSettings.heading ?? `Welcome to ${AppConfig.title}`}
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10">
              <MediaLink href={siteSettings.youtubeLink} icon="/assets/icons/youtube.svg" label="Watch" />
              <MediaLink
                href={siteSettings.podcastLink}
                icon="/assets/icons/headphones.svg"
                label="Listen"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeBanner builtOver={props.eibBuiltOver} />

      {/* a light band between the dark hero and footer; opted out of
          browser-forced dark modes, which would repaint it */}
      <section className="bg-[#f3ece1] text-stone-900" style={{ colorScheme: "only light" }}>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-end sm:justify-between md:py-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
              {siteSettings.serviceHeading}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-stone-900 md:text-4xl">
              {siteSettings.serviceTime}
            </p>
          </div>
          <Link
            href={siteSettings.addressLink}
            className="group text-stone-700 hover:text-stone-900 md:text-lg"
          >
            <span className="decoration-amber-600 underline-offset-4 group-hover:underline">
              218 Glover Road, Stoney Creek, ON{" "}
            </span>
            {/* postcode and arrow stay together so the arrow never wraps alone */}
            <span className="whitespace-nowrap">
              <span className="decoration-amber-600 underline-offset-4 group-hover:underline">
                L8E 5H6
              </span>
              <Image
                src="/assets/icons/navigation.svg"
                alt=""
                width={20}
                height={20}
                className="ml-2 inline align-[-3px] transition ease-in-out group-hover:translate-x-1 group-hover:rotate-45 group-hover:scale-110"
                unoptimized
              />
            </span>
          </Link>
        </div>
      </section>

      <main className="grow">
        {props.upcomingEvents.length > 0 && (
          <section className="mx-auto max-w-[1000px] px-6 py-16">
            <h2 className="text-center font-display text-3xl font-semibold text-white">
              Upcoming Events
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {props.upcomingEvents
                .slice(0, process.env.NEXT_PUBLIC_UPCOMING_EVENTS_LIMIT)
                .map((upcomingEvent: UpcomingEventProps) => {
                  return (
                    <UpcomingEvent
                      key={upcomingEvent.title + upcomingEvent.date}
                      title={upcomingEvent.title}
                      date={upcomingEvent.date}
                      description={upcomingEvent.description}
                    />
                  );
                })}
            </div>
          </section>
        )}
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
};

export async function getStaticProps() {
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  const siteSettings = await fetchSiteSettings();
  const upcomingEvents = await client.fetch(
    `*[_type == "upcomingEvent" && date >= '${todayFormatted}'] | order(date asc)`
  );
  return {
    props: {
      siteSettings,
      upcomingEvents,
      eibBuiltOver: isEibOver(),
    },
  };
}

export default Index;
