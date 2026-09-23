import { createFileRoute } from "@tanstack/react-router";

import { ShopPage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop IVORA" },
      { name: "description", content: "Browse the full IVORA collection: jackets, shirts, trousers, hoodies, sneakers and accessories." },
      { property: "og:title", content: "Shop IVORA" },
      { property: "og:description", content: "Browse the full IVORA collection of modern essentials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});
