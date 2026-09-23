import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IVORA — Modern Fashion Essentials" },
      { name: "description", content: "Shop IVORA: premium modern essentials, new arrivals, signature collections and stories from the IVORA journal." },
      { property: "og:title", content: "IVORA — Modern Fashion Essentials" },
      { property: "og:description", content: "The new standard in modern essentials. Explore IVORA AW26." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
