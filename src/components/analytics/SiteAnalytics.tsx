import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { getGaMeasurementId } from "@/lib/analytics";

/**
 * Loads GA4 once via the official Next.js third-parties integration.
 *
 * Page views, scrolls (90%), and outbound clicks come from GA4 Enhanced
 * Measurement — do not add a second gtag/GTM snippet or manual page_view
 * calls, or events will duplicate.
 *
 * No consent banner exists on this site; Consent Mode defaults deny ads
 * storage and allow analytics_storage (same pattern as Alderform). If a
 * consent UI is added later, update these defaults and call
 * gtag('consent', 'update', …) from it.
 *
 * Never send demonstration form field values to Analytics.
 */
export function SiteAnalytics() {
  const gaId = getGaMeasurementId();
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
        `}
      </Script>
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}
