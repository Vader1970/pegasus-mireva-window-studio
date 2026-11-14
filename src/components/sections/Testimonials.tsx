"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { site } from "@/lib/site";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";

function ReviewControls({
  index,
  total,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous example"
          aria-controls="review-track"
          className="grid h-[52px] w-[52px] cursor-pointer place-items-center border-2 border-black bg-transparent text-black transition-colors duration-300 hover:bg-black hover:text-white"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next example"
          aria-controls="review-track"
          className="grid h-[52px] w-[52px] cursor-pointer place-items-center border-2 border-black bg-transparent text-black transition-colors duration-300 hover:bg-black hover:text-white"
        >
          <ArrowRight />
        </button>
        <span className="ml-3 font-heading text-[15px] font-semibold text-black tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="text-[#5E6464]"> / {String(total).padStart(2, "0")}</span>
        </span>
      </div>
      <a
        href={site.designerReviews}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center gap-2 font-heading text-[15px] font-semibold text-accent-deep transition-colors duration-300 ease-[ease] hover:text-black"
      >
        View reviews of Pegasus Digital, the website designer
        <ArrowUpRight />
      </a>
      <p className="mt-2 mb-0 max-w-[28em] text-[13px] leading-relaxed text-muted">
        Those reviews relate to Pegasus Digital&apos;s web design services, not to Mireva or window coverings.
      </p>
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const prev = () => setIndex((current) => (current - 1 + total) % total);
  const next = () => setIndex((current) => (current + 1) % total);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="mt-[clamp(96px,11vw,160px)] bg-[rgba(36,236,230,0.07)] py-[clamp(80px,10vw,144px)]"
    >
      <Container>
        <SectionKicker label="The Customer Experience" index="05" indexClassName="text-[#5E6464]" />
        <div className="mt-[clamp(40px,5vw,72px)] flex flex-wrap gap-x-[clamp(40px,7vw,128px)] gap-y-10">
          <div className="flex flex-[0_1_420px] flex-col">
            <h2
              id="reviews-title"
              data-reveal="up"
              className="m-0 max-w-[9em] font-heading text-[clamp(36px,4.6vw,68px)] leading-[1.02] font-medium tracking-[-0.028em] text-balance text-black"
            >
              A Personal Touch.
              <br />
              At Every Step.
            </h2>
            <p className="mt-6 mb-0 max-w-[28em] text-[15px] leading-relaxed text-body">
              Illustrative content for this fictional website demonstration.
            </p>
            <div className="mt-auto hidden xl:block" />
            <div className="mt-12 hidden xl:block">
              <ReviewControls index={index} total={total} onPrev={prev} onNext={next} />
            </div>
          </div>

          <div
            data-reveal="fade"
            role="group"
            aria-roledescription="carousel"
            aria-label="Illustrative customer scenarios"
            className="max-w-[820px] flex-[1_1_520px]"
          >
            <div id="review-track" aria-live="polite" className="grid">
              {testimonials.map((review, reviewIndex) => {
                const active = reviewIndex === index;
                return (
                  <figure
                    key={review.id}
                    aria-roledescription="slide"
                    aria-label={`${reviewIndex + 1} of ${total}: ${review.label}`}
                    aria-hidden={!active}
                    className="col-start-1 row-start-1 m-0 flex flex-col"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "none" : "translateY(14px)",
                      visibility: active ? "visible" : "hidden",
                      transition:
                        "opacity .6s ease, transform .8s cubic-bezier(.2,.7,.1,1), visibility .6s",
                    }}
                  >
                    <span aria-hidden className="h-12 font-heading text-[96px] leading-[0.7] font-medium text-accent">
                      “
                    </span>
                    <blockquote className="mt-7 mb-9 font-heading text-[clamp(20px,2.1vw,30px)] leading-[1.42] font-medium tracking-[-0.018em] text-pretty text-black">
                      {review.quote}
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-4 border-t-2 border-black pt-5">
                      <span
                        aria-hidden
                        className="grid h-12 w-12 flex-none place-items-center rounded-full bg-accent-deep font-sans text-[22px] font-medium text-white"
                      >
                        {review.initial}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-[17px] font-semibold text-black">{review.label}</span>
                        <span className="mt-1 block text-sm text-body">{review.scenario}</span>
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            <div className="mt-8 xl:hidden">
              <ReviewControls index={index} total={total} onPrev={prev} onNext={next} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
