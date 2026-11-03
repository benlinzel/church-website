// Copy for the Evening in Bethlehem pages. Event details come from the flyer;
// the "good to know" notes are taken from the registration form itself.

const FORM_ID = "1FAIpQLSdOXcNIi6RrSLHEkc6K8lvBm0fG3GFfQEt8Kc2nSkfhFiALdg";

const VENUE_QUERY = "Winona Gospel Church, 218 Glover Rd, Stoney Creek, ON";

export const EIB = {
  title: "An Evening in Bethlehem",
  tagline: "An immersive retelling of the Christmas story",
  dateShort: "Dec 12 2026",
  dateLong: "Saturday, December 12, 2026",
  time: "5:30 – 8:30 PM",
  startsAt: "2026-12-12T17:30:00-05:00",
  endsAt: "2026-12-12T20:30:00-05:00",
  // The homepage banner and the event page content come down at midnight
  // (Eastern) after the event. See timing.tsx.
  showUntil: "2026-12-13T00:00:00-05:00",

  venue: "Winona Gospel Church",
  street: "218 Glover Rd",
  city: "Stoney Creek",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_QUERY)}`,
  parkingMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Winona Vine Estates, Stoney Creek, ON",
  )}`,
  calendarUrl:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("An Evening in Bethlehem")}` +
    "&dates=20261212T223000Z/20261213T013000Z" +
    `&details=${encodeURIComponent("An immersive retelling of the Christmas story at Winona Gospel Church.")}` +
    `&location=${encodeURIComponent(VENUE_QUERY)}`,

  formUrl: `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`,

  intro:
    "Follow the journey of Mary and Joseph through an interactive retelling of the true Christmas story. You can expect to see all of the characters from the biblical narrative, as well as live music and animals!",
  freeNote: "This is a free outdoor & indoor event",
  highlights: [
    { big: "5", label: "Scenes along the journey" },
    { big: "Live", label: "Animals" },
    { big: "Live", label: "Music" },
    { big: "Free", label: "Outdoor & indoor event" },
  ],

  glance: [
    {
      n: "01",
      title: "Parking",
      body: "Parking will be available at Winona Vine Estates.",
    },
    {
      n: "02",
      title: "Start here",
      body: "Your journey will begin with Joseph & Mary on the Journey to Bethlehem, located outside in the North parking lot.",
    },
    {
      n: "03",
      title: "Your Journey",
      body: "You will journey through 5 different scenes including the Gates of Bethlehem, and the Shepherds in the field.",
    },
    {
      n: "04",
      title: "Refreshments",
      body: "At the end of the journey there will be refreshments available.",
    },
  ],

  timeSlots: ["5:30", "6:00", "6:30", "7:00", "7:30", "8:00"],
  goodToKnow: [
    "Registration is free. Pick a 30-minute time block and we'll email you a specific start time within it.",
    "Please allow about 60 minutes for your tour, and arrive 10 minutes before your start time. Tours leave on time.",
    "Up to 15 people per registration. For a larger group, fill out the form again for the extra spots.",
    "While our building is accessible, this particular event is not well-suited for people with accessibility requirements.",
  ],

  email: "winonagospel@gmail.com",
  phone: "905-643-3116",

  christmasEve: {
    lead: "Following our Evening in Bethlehem event please join us for",
    title: "Christmas Eve Candle Light Service",
    when: "December 24th at 6 PM",
  },

  images: {
    // 1200x630 link-preview card (Facebook, WhatsApp, iMessage...)
    share: "/assets/images/eib/share.jpg",
  },
} as const;
