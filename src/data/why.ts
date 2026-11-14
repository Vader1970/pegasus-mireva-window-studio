export const reasons = [
  {
    n: "01",
    title: "Local & Personal Service",
    body: "Deal directly with Steve from the first consultation through to installation.",
    delay: 0,
  },
  {
    n: "02",
    title: "Mobile Showroom",
    body: "A wide range of fabrics, colours and blind types, brought to your home.",
    delay: 90,
  },
  {
    n: "03",
    title: "Free Measure & Quote",
    body: "Precise in-home measuring and a clear, no-obligation quote for your chosen blinds.",
    delay: 180,
  },
  {
    n: "04",
    title: "Professional Installation",
    body: "Every blind is professionally installed — carefully measured, fitted and finished.",
    delay: 270,
  },
] as const;

export const serviceList = [
  { title: "Advice & samples", detail: "In your home, from the mobile showroom", delay: 0 },
  { title: "Measuring", detail: "Every window, precisely", delay: 80 },
  { title: "Ordering", detail: "Made to measure for your windows", delay: 160 },
  { title: "Installation", detail: "Fitted by the person you first met", delay: 240 },
] as const;
