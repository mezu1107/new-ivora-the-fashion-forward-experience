import { createFileRoute } from "@tanstack/react-router";

import { OrderConfirmationPage } from "@/components/ivora/commerce";
import { useIvoraStore } from "@/lib/ivora-store";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — IVORA" },
      { name: "description", content: "Your IVORA order confirmation and delivery details." },
      { property: "og:title", content: "Order Confirmed — IVORA" },
      { property: "og:description", content: "Thank you for choosing IVORA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderRoute,
});

function OrderRoute() {
  const { id } = Route.useParams();
  const { findOrder } = useIvoraStore();
  return <OrderConfirmationPage order={findOrder(id)} />;
}
