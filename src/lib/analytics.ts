/**
 * GA4 for the Pegasus Digital – Showcase Concepts property.
 * Measurement ID is supplied via NEXT_PUBLIC_GA_MEASUREMENT_ID only.
 *
 * Page views, scrolls, and outbound clicks come from GA4 Enhanced Measurement
 * via `@next/third-parties/google`. Do not send manual page_view / scroll /
 * outbound click events (duplicates). Never send demo form field values.
 */

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !MEASUREMENT_ID_PATTERN.test(id)) {
    return undefined;
  }
  return id;
}
