import { useEffect, useState } from "react";

/**
 * macOS window drag strip.
 *
 * The main window is created with `titleBarStyle: "hiddenInset"` (see
 * electron/main.ts), which removes the native title bar and lets the renderer
 * paint the full window — including the area behind the traffic lights. macOS
 * then provides NO draggable area of its own, so without an explicit
 * `-webkit-app-region: drag` region the window cannot be moved at all.
 *
 * This renders a thin transparent strip pinned to the top of the viewport that
 * acts as the title bar. It sits above the paywall/onboarding overlays (z-50)
 * so the window stays movable while a modal is open, and is kept short enough
 * (32px) to clear their content — LicenseGate starts at 40px, Onboarding is
 * vertically centred, and the main page starts at 32px.
 *
 * Renders only inside Electron; a plain browser build keeps its own chrome.
 */
export default function TitleBar() {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Client-only detection so the SSR markup and the first client render
    // agree (rendering nothing on both) and hydration stays clean.
    const electron =
      typeof navigator !== "undefined" && /Electron/i.test(navigator.userAgent);
    setIsElectron(electron);
    // Lets CSS add headroom under the traffic lights only in the desktop app.
    document.body.classList.toggle("is-electron", electron);
  }, []);

  if (!isElectron) return null;

  return (
    <div
      className="app-drag fixed inset-x-0 top-0 z-[100] h-8"
      aria-hidden="true"
    />
  );
}
