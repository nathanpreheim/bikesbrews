type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    va?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: AnalyticsPayload }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export async function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  // TODO: Wire this to your analytics provider after choosing one for launch.
  console.log("[analytics:server]", name, payload);
}

export function trackClientEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  // TODO: Replace or extend these provider calls once analytics is selected.
  window.va?.("event", { name, ...payload });
  window.plausible?.(name, { props: payload });
  window.gtag?.("event", name, payload);
  console.log("[analytics:client]", name, payload);
}
