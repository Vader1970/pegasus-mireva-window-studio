"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { coveringOptions } from "@/data/products";
import { site } from "@/lib/site";
import { ArrowSubmit } from "@/components/ui/Button";
import { ChevronDown } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";

type FormState = {
  name: string;
  email: string;
  phone: string;
  covering: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  covering: "",
  message: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.covering) errors.covering = "Please choose a window covering type.";
  if (!values.message.trim()) errors.message = "Please tell us a little about your project.";
  return errors;
}

export function Contact() {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[data-enquire]");
      if (!link) return;
      const covering = link.getAttribute("data-enquire");
      if (!covering) return;
      setValues((current) => ({ ...current, covering }));
      setSubmitted(false);
      setErrors({});
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstKey = Object.keys(nextErrors)[0] as keyof FormState;
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      field?.focus();
      return;
    }
    setSubmitted(true);
    setValues(empty);
  };

  const field = (
    name: keyof FormState,
    label: string,
    control: React.ReactNode,
  ) => {
    const errorId = `${baseId}-${name}-error`;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={`${baseId}-${name}`} className="font-heading text-[13px] font-semibold tracking-[0.04em] text-black uppercase">
          {label}
        </label>
        {control}
        {errors[name] ? (
          <p id={errorId} className="m-0 text-sm text-[#8A1F1F]" role="alert">
            {errors[name]}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper py-[clamp(96px,11vw,160px)]">
      <Container>
        <SectionKicker label="Contact" index="07" />
        <div className="mt-[clamp(40px,5vw,72px)] flex flex-wrap gap-x-[clamp(40px,7vw,128px)] gap-y-12">
          <div className="flex-[0_1_420px]">
            <h2
              id="contact-title"
              data-reveal="up"
              className="m-0 max-w-[10em] font-heading text-[clamp(36px,4.6vw,68px)] leading-[1.02] font-medium tracking-[-0.028em] text-balance text-black"
            >
              Let&apos;s Talk About Your Windows.
            </h2>
            <p data-reveal="up" data-delay="120" className="mt-7 mb-0 max-w-[28em] text-[17px] leading-[1.65] text-pretty text-body">
              Tell us a little about your home and the coverings you have in mind. Steve will guide you through samples, measuring and installation in this fictional showcase.
            </p>
            <p data-reveal="up" data-delay="180" className="mt-6 mb-0 max-w-[28em] border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-body">
              Fictional business website concept. This form is for demonstration only and does not send enquiries.
            </p>
          </div>

          <div data-reveal="up" data-delay="100" className="max-w-[820px] flex-[1_1_520px]">
            {submitted ? (
              <div
                role="status"
                className="border-2 border-black bg-white px-6 py-8 text-[17px] leading-[1.65] text-body"
              >
                <p className="m-0 font-heading text-xl font-semibold tracking-[-0.02em] text-black">
                  This is a demonstration form. No enquiry has been sent.
                </p>
                <p className="mt-4 mb-0">
                  Interested in a website like this? Visit{" "}
                  <a
                    href={site.pegasusRedesignsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-deep underline decoration-transparent transition-colors duration-300 hover:text-black hover:decoration-current"
                  >
                    Pegasus Digital
                  </a>
                  .
                </p>
                <button
                  type="button"
                  className="mt-6 inline-flex min-h-11 cursor-pointer items-center border-0 bg-transparent p-0 font-heading text-[15px] font-semibold text-black underline decoration-transparent transition-colors duration-300 hover:text-accent-deep hover:decoration-current"
                  onClick={() => setSubmitted(false)}
                >
                  Preview another enquiry
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                noValidate
                onSubmit={onSubmit}
                className="flex flex-col gap-5 border-t-2 border-black pt-8"
              >
                {field(
                  "name",
                  "Name",
                  <input
                    id={`${baseId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
                    onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                    className="min-h-14 border-2 border-line bg-white px-4 font-sans text-base text-black outline-none transition-colors duration-200 focus:border-black"
                  />,
                )}
                {field(
                  "email",
                  "Email",
                  <input
                    id={`${baseId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
                    onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                    className="min-h-14 border-2 border-line bg-white px-4 font-sans text-base text-black outline-none transition-colors duration-200 focus:border-black"
                  />,
                )}
                {field(
                  "phone",
                  "Phone (optional)",
                  <input
                    id={`${baseId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
                    className="min-h-14 border-2 border-line bg-white px-4 font-sans text-base text-black outline-none transition-colors duration-200 focus:border-black"
                  />,
                )}
                {field(
                  "covering",
                  "Window covering type",
                  <div className="relative">
                    <select
                      id={`${baseId}-covering`}
                      name="covering"
                      value={values.covering}
                      aria-invalid={Boolean(errors.covering)}
                      aria-describedby={errors.covering ? `${baseId}-covering-error` : undefined}
                      onChange={(event) => setValues((current) => ({ ...current, covering: event.target.value }))}
                      className="min-h-14 w-full appearance-none border-2 border-line bg-white px-4 pr-12 font-sans text-base text-black outline-none transition-colors duration-200 focus:border-black"
                    >
                      <option value="" disabled>
                        Select a type
                      </option>
                      {coveringOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-black">
                      <ChevronDown />
                    </span>
                  </div>,
                )}
                {field(
                  "message",
                  "Tell us about your project",
                  <textarea
                    id={`${baseId}-message`}
                    name="message"
                    rows={5}
                    value={values.message}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
                    onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
                    className="min-h-[140px] resize-y border-2 border-line bg-white px-4 py-3 font-sans text-base text-black outline-none transition-colors duration-200 focus:border-black"
                  />,
                )}

                <p className="m-0 text-[14px] leading-relaxed text-muted">
                  Fictional business website concept. This form is for demonstration only and does not send enquiries.
                </p>

                <div>
                  <ArrowSubmit>Preview Enquiry</ArrowSubmit>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
