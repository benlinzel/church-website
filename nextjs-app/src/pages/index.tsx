/* eslint-disable @next/next/no-img-element */
import { PortableText } from "@portabletext/react";
import Link from "next/link";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  client,
  myPortableTextComponentsNoMargin,
  urlFor,
} from "@/utils/SanityConfig";

interface UpcomingEventProps {
  title: string;
  date: Date;
  description: any;
}

const UpcomingEvent = (props: UpcomingEventProps) => {
  return (
    <div className="mx-auto w-[80%] px-4 pt-4 text-center sm:w-[90%]">
      <p className="text-xl font-medium">{props.title}</p>
      <p className="pb-2 font-extralight text-amber-500">
        {new Date(props.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        })}
      </p>
      {/* <p className="pt-2 font-light text-white/60">{props.description}</p> */}
      <PortableText
        value={props.description}
        components={myPortableTextComponentsNoMargin}
      />
      <hr className="mt-4 opacity-20" />
    </div>
  );
};

const HoveringPlayer = (props: any) => {
  return (
    <div className="mx-auto hidden h-full p-8 md:block md:w-1/2">
      <div className="h-[420px] flex gap-x-8 2xl:gap-x-16 items-center justify-center rounded-2xl drop-shadow-2xl">

          {/* <p className="text-amber-500">Latest Sermon</p>
          <p className=" text-3xl text-white">Passage / Sermon Title</p>
          <p className="font-extralight">Jan 29 2023</p> */}
          <Link
            className="py-1 px-3 rounded-lg bg-stone-800 text-xl 2xl:text-3xl text-white hover:text-amber-500 drop-shadow-2xl transition duration-300 ease-in-out hover:scale-110"
            href={props.siteSettings.youtubeLink}
          >
            <span className="ml-1 flex items-center justify-between">
              <span>Watch</span>
              <img
                src="/assets/icons/youtube.svg"
                alt=""
                className="ml-1 h-10 w-10"
              />
            </span>
          </Link>
          <Link
            className="py-1 px-3 rounded-lg bg-stone-800 text-xl 2xl:text-3xl text-white hover:text-amber-500 drop-shadow-2xl transition duration-300 ease-in-out hover:scale-110"
            href={props.siteSettings.podcastLink}
          >
            <span className="ml-1 flex items-center justify-between">
              <span>Listen</span>
              <img
                src="/assets/icons/headphones.svg"
                alt=""
                className="ml-1 h-10 w-10"
              />
            </span>
          </Link>
      </div>
    </div>
  );
};

const BlockPlayer = (props: any) => {
  return (
    <div className="h-40 bg-[url('/assets/images/cross-hill-middle-east.png')] bg-cover bg-center bg-no-repeat md:hidden md:h-96">
      <div className="flex h-full flex-col justify-center bg-black/50 p-4 hover:bg-black/20">
        <div className="md:pl-8">
          {/* <p className="text-amber-500">Latest Sermon</p>
          <p className="text-3xl text-white">Passage / Sermon Title</p>
          <p className="font-extralight">Jan 29 2023</p> */}
        </div>
        <Link
          className="mx-auto rounded-lg border-amber-500 bg-stone-700 px-2 text-xl text-amber-500 drop-shadow-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border hover:text-amber-500 hover:drop-shadow-2xl"
          href={props.siteSettings.youtubeLink}
        >
          <span className="ml-1 flex items-center justify-between">
            <span>Watch</span>
            <img
              src="/assets/icons/youtube.svg"
              alt=""
              className="ml-2 h-10 w-10"
            />
          </span>
        </Link>
        <Link
          className="mx-auto mt-2 rounded-lg border-amber-500 bg-stone-700 px-2 text-xl text-amber-500 drop-shadow-2xl transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:border hover:text-amber-500 hover:drop-shadow-2xl"
          href={props.siteSettings.podcastLink}
        >
          <span className="ml-1 flex items-center justify-between">
            <span>Listen</span>
            <img
              src="/assets/icons/headphones.svg"
              alt=""
              className="ml-1 h-10 w-10"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

const Index = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r  from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className=" h-[200px] bg-[url('/assets/images/pulpit-short.jpeg')] bg-cover bg-center bg-no-repeat sm:h-[300px] md:h-[600px]">
        <div className="h-full bg-black/40">
          <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
          <div className="relative mx-auto flex max-w-[1400px] flex-row">
            {/* <div className="py-8 px-2 text-center text-5xl font-extralight md:w-2/3 md:pt-32 md:pl-12 md:text-left md:text-6xl lg:w-1/2 lg:pt-40">
              {props.siteSettings.heading}
            </div> */}
            <HoveringPlayer {...props} />
          </div>
        </div>
      </div>
      <BlockPlayer {...props} />
      <div className="items-left flex h-40 flex-col justify-center bg-gradient-to-r from-stone-400 to-stone-400/80 text-lg text-black md:text-2xl">
        <div className="justify-beginning mx-auto">
          <p className="font-medium">{props.siteSettings.serviceHeading}</p>
          <p className="font-light">{props.siteSettings.serviceTime}</p>
          <Link href={props.siteSettings.addressLink}>
            <span className="group flex items-center justify-between font-light text-black ">
              <span className="text-base group-hover:underline group-hover:decoration-amber-500 md:text-2xl">
                218 Glover Road, Stoney Creek, ON L8E 5H6
              </span>
              <img
                src="/assets/icons/navigation.svg"
                alt=""
                className="mx-1 h-5 w-5 transition ease-in-out group-hover:translate-x-1 group-hover:rotate-45 group-hover:scale-110"
              />
            </span>
          </Link>
        </div>
      </div>

      <div className="grow bg-gradient-to-r from-stone-800 to-stone-900  text-white/80">
        {props.upcomingEvents.length > 0 && (
          <div className="pb-20 pt-4">
            <p className="py-4 text-center text-3xl font-medium">
              Upcoming Events
            </p>
            <div className="mx-auto grid max-w-[900px] grid-cols-1 items-end gap-1 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        )}
      </div>
      <Footer siteSettings={props.siteSettings} />
    </div>
  );
};

export async function getStaticProps() {
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  const siteSettings = await client
    .fetch(`*[_id == "siteSettings"]`)
    .then((settings) => {
      return settings[0];
    });
  const upcomingEvents = await client.fetch(
    `*[_type == "upcomingEvent" && date >= '${todayFormatted}'] | order(date asc)`
  );
  return {
    props: {
      siteSettings,
      upcomingEvents,
    },
    revalidate: 43200,
  };
}

export default Index;
