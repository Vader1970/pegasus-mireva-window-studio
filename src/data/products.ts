export type FeaturedProduct = {
  n: string;
  title: string;
  description: string;
  image: string;
  position: string;
  href: string;
  id: string;
  alt: string;
};

export const featuredProducts: FeaturedProduct[] = [
  {
    n: "01",
    title: "Roller Blinds",
    description: "Sleek, modern and highly functional.",
    image: "/images/01-roller-blinds.webp",
    position: "44% 50%",
    href: "#contact",
    id: "roller-blinds",
    alt: "Grey made-to-measure roller blind half-lowered over a living room window",
  },
  {
    n: "02",
    title: "Venetian Blinds",
    description: "Classic control over light and privacy.",
    image: "/images/02-venetian-blinds.webp",
    position: "50% 50%",
    href: "#contact",
    id: "venetian-blinds",
    alt: "White Venetian blinds filtering soft daylight beside a vase of olive branches",
  },
  {
    n: "03",
    title: "Honeycomb Blinds",
    description: "Ultimate thermal efficiency and window coverage.",
    image: "/images/03-honeycomb-blind.webp",
    position: "38% 50%",
    href: "#contact",
    id: "honeycomb-blinds",
    alt: "Charcoal honeycomb blind beside a lamp and candle on a dark desk",
  },
];

export const rangeProducts = [
  {
    title: "Vertical Blinds",
    description: "Ideal for sliding doors and wide windows.",
    image: "/images/04-vertical-blinds.webp",
    position: "60% 50%",
    href: "#contact",
    id: "vertical-blinds",
    alt: "White vertical blinds drawn across a sliding door in a modern lounge",
  },
  {
    title: "Veri Shades",
    description: "Soft sheer vanes that tilt, glide and stack.",
    image: "/images/05-veri-shades.webp",
    position: "70% 50%",
    href: "#contact",
    id: "veri-shades",
    alt: "Sheer white Veri Shades filtering a harbour view behind a dining table",
  },
  {
    title: "Motorised Blinds",
    description: "Raise and lower at the touch of a button.",
    image: "/images/06-motorised-roller.webp",
    position: "40% 50%",
    href: "#contact",
    id: "motorised-blinds",
    alt: "Motorised roller blind being lowered with a handheld remote",
  },
] as const;

export const coveringOptions = [
  "Roller Blinds",
  "Venetian Blinds",
  "Honeycomb Blinds",
  "Vertical Blinds",
  "Veri Shades",
  "Motorised Blinds",
  "Not sure yet",
] as const;
