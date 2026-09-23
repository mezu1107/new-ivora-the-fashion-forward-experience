import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About IVORA" },
      { name: "description", content: "IVORA creates modern essentials focused on clean silhouettes, thoughtful details and effortless style." },
      { property: "og:title", content: "About IVORA" },
      { property: "og:description", content: "Designed for everyday. Discover the story of IVORA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});
