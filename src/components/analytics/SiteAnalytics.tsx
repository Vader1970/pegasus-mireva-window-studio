import { GoogleAnalytics } from "@next/third-parties/google";
import { getGaMeasurementId } from "@/lib/analytics";

/**
 * Single GA4 mount for the app. Renders nothing when the measurement ID is unset
 * so local builds without env config stay tag-free (no duplicate / empty tags).
 */
export function SiteAnalytics() {
  const gaId = getGaMeasurementId();
  if (!gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
