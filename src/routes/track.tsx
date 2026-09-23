import { createFileRoute } from "@tanstack/react-router";

import { TrackOrderPage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Order — IVORA" },
      { name: "description", content: "Track your IVORA order from confirmation through delivery." },
      { property: "og:title", content: "Track Order — IVORA" },
      { property: "og:description", content: "Track your IVORA order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackOrderPage,
});
