import { createFileRoute } from "@tanstack/react-router";

import { CheckoutPage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — IVORA" },
      { name: "description", content: "Complete your IVORA order with contact, delivery and payment details." },
      { property: "og:title", content: "Checkout — IVORA" },
      { property: "og:description", content: "Complete your IVORA order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});
