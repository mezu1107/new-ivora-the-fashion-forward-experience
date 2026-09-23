import { createFileRoute } from "@tanstack/react-router";

import { CollectionsPage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "The IVORA Collection" },
      { name: "description", content: "Modern essentials designed around clean silhouettes, refined details and effortless everyday style." },
      { property: "og:title", content: "The IVORA Collection" },
      { property: "og:description", content: "Modern essentials designed around clean silhouettes and refined details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});
