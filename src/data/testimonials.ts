export type Testimonial = {
  id: string;
  label: string;
  scenario: string;
  initial: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "example-01",
    label: "Illustrative example 01",
    scenario: "Sample scenario · Roller blinds",
    initial: "A",
    quote:
      "From the first fabric samples to the final fit, one person handled every step. The roller blinds sit cleanly in the recess and the light in the living room feels settled.",
  },
  {
    id: "example-02",
    label: "Illustrative example 02",
    scenario: "Sample scenario · Venetian blinds",
    initial: "B",
    quote:
      "We needed privacy without losing daylight. The Venetian blinds made tilting and filtering light simple, and the measure-and-fit process stayed clear throughout.",
  },
  {
    id: "example-03",
    label: "Illustrative example 03",
    scenario: "Sample scenario · Honeycomb blinds",
    initial: "C",
    quote:
      "Choosing honeycomb blinds for the colder rooms felt considered. Samples arrived at home, the quote was easy to follow, and installation was tidy and unhurried.",
  },
  {
    id: "example-04",
    label: "Illustrative example 04",
    scenario: "Sample scenario · Motorised blinds",
    initial: "D",
    quote:
      "Motorisation was new to us. The options were explained plainly, the remote control was set up on the day, and raising the blinds is now part of the morning routine.",
  },
];
