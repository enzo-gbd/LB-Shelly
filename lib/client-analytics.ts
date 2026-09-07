"use client";

import { track } from "@vercel/analytics";

export function trackClientEvent(
  name: string,
  properties?: Record<string, string | number | boolean>,
) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never block navigation or a successful download.
  }
}
