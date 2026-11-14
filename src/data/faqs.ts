export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "How much do custom blinds cost?",
    answer:
      "The cost depends on the size of your windows, the fabric or blind type you choose, and any options such as motorisation. Use the demonstration enquiry form and we can talk through what would suit your home — this showcase does not provide live quotes.",
  },
  {
    question: "Do you offer installation?",
    answer:
      "In this fictional concept, every blind is professionally installed as part of the personal service — carefully measured, fitted and finished by the same specialist you first spoke with.",
  },
  {
    question: "What areas do you service?",
    answer:
      "This demonstration presents service across Christchurch and North Canterbury. For a real project with Pegasus Digital, visit the contact options on their website.",
  },
  {
    question: "How long does it take to get blinds installed?",
    answer:
      "Lead times vary with the product and fabric you choose. After measuring and confirming your order, installation is arranged once the made-to-measure blinds are ready.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Consultation",
    body: "Talk through your needs, explore colours and fabrics from the mobile showroom, and arrange a free in-home measure.",
    lineDelay: 0,
    textDelay: 150,
  },
  {
    n: "02",
    title: "Measure & Quote",
    body: "Precise measurements are taken in your home and a tailored, no-obligation quote is prepared for your chosen blinds.",
    lineDelay: 350,
    textDelay: 500,
  },
  {
    n: "03",
    title: "Professional Installation",
    body: "Once your made-to-measure blinds are ready, installation is arranged so each window is carefully fitted and finished.",
    lineDelay: 700,
    textDelay: 850,
  },
] as const;
