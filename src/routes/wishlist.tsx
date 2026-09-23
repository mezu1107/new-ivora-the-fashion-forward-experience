import { createFileRoute } from "@tanstack/react-router";

import { WishlistPage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — IVORA" },
      { name: "description", content: "Save the IVORA pieces you love and move them to your bag whenever you are ready." },
      { property: "og:title", content: "Your Wishlist — IVORA" },
      { property: "og:description", content: "Save the IVORA pieces you love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});
