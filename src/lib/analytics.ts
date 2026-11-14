/**
 * GA4 configuration for the Mireva showcase (Pegasus Digital — Showcase Concepts).
 *
 * Page views, scrolls, and outbound clicks are collected by GA4 Enhanced Measurement
 * through the official `@next/third-parties/google` GoogleAnalytics tag. Do not send
 * manual `page_view`, `scroll`, or outbound `click` events — that duplicates data.
 *
 * Never pass demonstration form values or personal information into analytics events.
 */

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !MEASUREMENT_ID_PATTERN.test(id)) {
    return undefined;
  }
  return id;
}
