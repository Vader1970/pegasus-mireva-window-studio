import { AboutSteve } from "@/components/sections/AboutSteve";
import { Contact } from "@/components/sections/Contact";
import { FAQs } from "@/components/sections/FAQs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { MotionRoot } from "@/components/motion/MotionRoot";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <WhyChooseUs />
      <Products />
      <AboutSteve />
      <Process />
      <Testimonials />
      <FAQs />
      <FinalCTA />
      <Contact />
      <MotionRoot />
    </main>
  );
}
