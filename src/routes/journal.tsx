import { createFileRoute } from "@tanstack/react-router";

import { JournalPage } from "@/components/ivora/commerce";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The IVORA Journal" },
      { name: "description", content: "Styling guides, wardrobe thinking and stories from inside IVORA." },
      { property: "og:title", content: "The IVORA Journal" },
      { property: "og:description", content: "Notes on modern dressing from IVORA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});
