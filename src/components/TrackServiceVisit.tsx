"use client";

import { useEffect } from "react";

export default function TrackServiceVisit({ slug }: { slug: string }) {
  useEffect(() => {
    // Fire and forget request — log the view
    fetch("https://rehabserver.onrender.com/analytics/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceSlug: slug }),
    }).catch((err) => console.error("Error tracking service visit:", err));
  }, [slug]);

  return null; // no UI needed
}
