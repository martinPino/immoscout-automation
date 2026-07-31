import type { AppProps } from "next/app";
import "../styles/globals.css";
import LicenseGate from "@/components/LicenseGate";
import TitleBar from "@/components/TitleBar";

// Note: no Vercel Analytics / Speed Insights here on purpose. This Next app is
// the Electron desktop UI — it is served by the bundled standalone server on
// localhost and never runs on Vercel's edge, so those trackers only produce
// 404s against /_vercel/... and would ship tracking code in an app advertised
// as collecting no data. They live in docs/index.html, the page Vercel serves.

export default function App({ Component, pageProps }: AppProps) {
  // LicenseGate enforces the paywall inside the packaged Electron app. In a
  // plain web build / `next dev` (no window.license bridge) it passes through,
  // and while the app is unprovisioned / LICENSE_DEV_BYPASS=1 the main process
  // reports an active license, so development is never blocked.
  return (
    <LicenseGate>
      {/* Mounted outside the page so the window stays draggable on every
          screen — including while the paywall or onboarding overlay is up. */}
      <TitleBar />
      <Component {...pageProps} />
    </LicenseGate>
  );
}
