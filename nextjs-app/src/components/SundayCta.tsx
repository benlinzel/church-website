import { useSyncExternalStore } from "react";

// On the day of the service (read from the Studio's "Service Time" text, e.g.
// "Sunday - 10:00 am"), a prompt above the homepage heading that changes
// through the day: directions before, the livestream from just before the
// start, the recording after. The site is built ahead of time, so this is
// worked out in the browser, in the church's time zone wherever the visitor is.

const CHURCH_TIME_ZONE = "America/Toronto";
const SOON = 15; // minutes before the start to point at the livestream
const SERVICE_LENGTH = 90; // minutes

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

type Service = { day: number; start: number; label: string };

// "Sunday - 10:00 am" -> Sunday, 600 minutes, "10:00 am". Anything it can't
// read gives no prompt rather than a wrong one.
const parseServiceTime = (text: string | undefined): Service | undefined => {
  const lower = text?.toLowerCase() ?? "";
  const day = DAYS.findIndex((name) => lower.includes(name));
  const time = lower.match(/(\d{1,2})(?::(\d{2}))?\s*([ap])\.?\s*m\b/);
  if (day === -1 || !time) return undefined;
  const hour = (Number(time[1]) % 12) + (time[3] === "p" ? 12 : 0);
  const minute = time[2] ?? "00";
  const label = `${hour % 12 || 12}:${minute} ${time[3]}m`;
  return { day, start: hour * 60 + Number(minute), label };
};

type Phase = "before" | "soon" | "live" | "after";

const phaseAt = (now: Date, service: Service): Phase | null => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: CHURCH_TIME_ZONE,
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value])
  );
  if (DAYS.indexOf(parts.weekday?.toLowerCase() ?? "") !== service.day) return null;
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  if (minutes < service.start - SOON) return "before";
  if (minutes < service.start) return "soon";
  if (minutes < service.start + SERVICE_LENGTH) return "live";
  return "after";
};

// recheck every half minute so an open tab moves on to "live" and "after"
const subscribeToClock = (onChange: () => void) => {
  const timer = setInterval(onChange, 30_000);
  return () => clearInterval(timer);
};

const SundayCta = ({
  serviceTime,
  addressLink,
  youtubeLink,
}: {
  serviceTime?: string;
  addressLink: string;
  youtubeLink: string;
}) => {
  const service = parseServiceTime(serviceTime);
  const phase = useSyncExternalStore(
    subscribeToClock,
    () => (service ? phaseAt(new Date(), service) : null),
    () => null // nothing in the built HTML; it appears once the browser knows the time
  );
  if (!service || !phase) return null;

  const dayName = DAYS[service.day]!.replace(/^./, (c) => c.toUpperCase());
  // the time stays in one piece so it never wraps mid-way
  const time = <span className="whitespace-nowrap">{service.label}</span>;
  const { href, lead, action } = {
    before: {
      href: addressLink,
      lead: (
        <>
          <span className="hidden sm:inline">It&apos;s {dayName}! </span>Join us today at {time}
        </>
      ),
      action: "Directions",
    },
    soon: { href: youtubeLink, lead: <>Starting at {time}</>, action: "Watch live" },
    live: { href: youtubeLink, lead: "We're live now", action: "Watch" },
    after: { href: youtubeLink, lead: "Missed today's service?", action: "Watch it" },
  }[phase];

  return (
    <a
      href={href}
      className="group mb-6 inline-flex items-center gap-2.5 rounded-full bg-black/45 py-2 pl-3.5 pr-4 text-sm text-white ring-1 ring-inset ring-white/20 backdrop-blur-md transition hover:ring-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 motion-reduce:transition-none md:mb-8 md:text-base"
    >
      <span aria-hidden className="relative flex h-2.5 w-2.5">
        {(phase === "soon" || phase === "live") && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none ${phase === "live" ? "bg-red-500" : "bg-amber-400"}`}
          />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${phase === "live" ? "bg-red-500" : "bg-amber-400"}`}
        />
      </span>
      <span>{lead}</span>
      <span className="whitespace-nowrap font-semibold text-amber-400 group-hover:underline">
        {action} <span aria-hidden>→</span>
      </span>
    </a>
  );
};

export default SundayCta;
