export type NavLink = {
  label: string;
  href: string;
  current?: boolean;
  sub?: { label: string; href: string }[];
};

export const blindLinks = [
  {
    label: "Roller Blinds",
    short: "Roller",
    description: "Sleek, modern and functional",
    href: "#roller-blinds",
    id: "roller-blinds",
  },
  {
    label: "Venetian Blinds",
    short: "Venetian",
    description: "Classic light and privacy control",
    href: "#venetian-blinds",
    id: "venetian-blinds",
  },
  {
    label: "Honeycomb Blinds",
    short: "Honeycomb",
    description: "Thermal efficiency and coverage",
    href: "#honeycomb-blinds",
    id: "honeycomb-blinds",
  },
  {
    label: "Vertical Blinds",
    short: "Vertical",
    description: "For sliding doors and wide windows",
    href: "#vertical-blinds",
    id: "vertical-blinds",
  },
  {
    label: "Veri Shades",
    short: "Veri Shades",
    description: "Soft sheer vanes that glide",
    href: "#veri-shades",
    id: "veri-shades",
  },
  {
    label: "Motorised Blinds",
    short: "Motorised",
    description: "At the touch of a button",
    href: "#motorised-blinds",
    id: "motorised-blinds",
  },
] as const;

export const mainNav: NavLink[] = [
  { label: "Home", href: "#home", current: true },
  { label: "About Us", href: "#about" },
  {
    label: "Blinds",
    href: "#collection",
    sub: blindLinks.map((item) => ({ label: item.short, href: item.href })),
  },
  { label: "Services", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const footerExplore = [
  { label: "Home", href: "#home" },
  { label: "Why Mireva", href: "#why-us" },
  { label: "About Us", href: "#about" },
  { label: "All Blinds", href: "#collection" },
  { label: "How It Works", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
