import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { type ReactNode, useSyncExternalStore } from "react";

import HomeBanner from "@/components/eib/HomeBanner";
import { isEibOver } from "@/components/eib/timing";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SundayCta from "@/components/SundayCta";
import { AppConfig } from "@/utils/AppConfig";
import { myPortableTextComponentsNoMargin } from "@/utils/SanityConfig";
import client, { fetchSiteSettings } from "@/utils/sanity.client";

interface UpcomingEventProps {
  _id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: any;
}

const EVENTS_LIMIT = Number(process.env.NEXT_PUBLIC_UPCOMING_EVENTS_LIMIT) || undefined;

const subscribeNever = () => () => {};

// The page is built ahead of time, so events that have passed since the last
// build are dropped again in the browser. The first render uses the build's
// list so it matches the HTML.
const useUpcoming = (events: UpcomingEventProps[]) => {
  const today = useSyncExternalStore(
    subscribeNever,
    () => new Date().toLocaleDateString("en-CA"), // local YYYY-MM-DD
    () => null
  );
  const upcoming = today ? events.filter((event) => event.date >= today) : events;
  return upcoming.slice(0, EVENTS_LIMIT);
};

const UpcomingEvent = (props: Omit<UpcomingEventProps, "_id">) => {
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

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 md:h-6 md:w-6" fill="currentColor">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className="h-5 w-5 md:h-6 md:w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    <rect x="3" y="14" width="4.5" height="6.5" rx="1.5" fill="currentColor" />
    <rect x="16.5" y="14" width="4.5" height="6.5" rx="1.5" fill="currentColor" />
  </svg>
);

// Watch is the main action (solid amber); Listen sits beside it in glass
const MediaLink = ({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  primary?: boolean;
}) => (
  <a
    href={href}
    className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-lg font-semibold shadow-xl transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 motion-reduce:transition-none md:px-7 md:text-xl ${
      primary
        ? "bg-amber-500 text-stone-950 hover:bg-amber-400"
        : "bg-white/10 text-white ring-1 ring-inset ring-white/35 backdrop-blur-md hover:bg-white/15 hover:ring-amber-400"
    }`}
  >
    {icon}
    {label}
  </a>
);

// widths made by scripts/hero-images.mjs
const HERO_WIDTHS = [640, 960, 1280, 1920, 2560];
const heroSrcSet = (format: "avif" | "webp") =>
  HERO_WIDTHS.map((width) => `/assets/images/hero/pulpit-${width}.${format} ${width}w`).join(", ");

const Index = (props: any) => {
  const { siteSettings } = props;
  const upcomingEvents = useUpcoming(props.upcomingEvents);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 text-white/90">
      <section className="relative isolate">
        <picture>
          <source type="image/avif" srcSet={heroSrcSet("avif")} sizes="100vw" />
          {/* next/image can't resize local files in a static export, so the
              sizes are made ahead of time by scripts/hero-images.mjs */}
          <img
            src="/assets/images/hero/pulpit-1280.webp"
            srcSet={heroSrcSet("webp")}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
        </picture>
        {/* dark at the top for the nav and at the bottom for the heading,
            lighter in between so the spotlit pulpit shows */}
        <div className="flex min-h-[75svh] flex-col bg-gradient-to-b from-black/60 via-black/20 to-black/85 sm:min-h-[560px] md:min-h-[680px] xl:min-h-[800px]">
          <Navbar logo={siteSettings.logo} />
          <div className="mx-auto flex w-full max-w-[1200px] grow flex-col items-center justify-end px-6 pb-14 text-center md:pb-20">
            <SundayCta
              serviceTime={siteSettings.serviceTime}
              addressLink={siteSettings.addressLink}
              youtubeLink={siteSettings.youtubeLink}
            />
            <h1 className="max-w-4xl text-balance font-display text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
              {siteSettings.heading ?? `Welcome to ${AppConfig.title}`}
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10">
              <MediaLink href={siteSettings.youtubeLink} icon={<PlayIcon />} label="Watch" primary />
              <MediaLink href={siteSettings.podcastLink} icon={<HeadphonesIcon />} label="Listen" />
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
          <a
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
          </a>
        </div>
      </section>

      <main className="grow">
        {upcomingEvents.length > 0 && (
          <section className="mx-auto max-w-[1000px] px-6 py-16">
            <h2 className="text-center font-display text-3xl font-semibold text-white">
              Upcoming Events
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((upcomingEvent) => (
                <UpcomingEvent
                  key={upcomingEvent._id}
                  title={upcomingEvent.title}
                  date={upcomingEvent.date}
                  description={upcomingEvent.description}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
};

export async function getStaticProps() {
  const today = new Date().toISOString().split("T")[0];

  const siteSettings = await fetchSiteSettings();
  // every future event, not just the first few: the browser drops ones that
  // pass before the next build, and later ones move up to fill the space
  const upcomingEvents = await client.fetch(
    `*[_type == "upcomingEvent" && date >= $today] | order(date asc)`,
    { today }
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
