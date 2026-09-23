import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { campaignImages } from "@/lib/ivora-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact IVORA" },
      { name: "description", content: "Questions about IVORA pieces, orders or styling — talk to the IVORA team." },
      { property: "og:title", content: "Contact IVORA" },
      { property: "og:description", content: "Talk to the IVORA team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <main className="mx-auto max-w-[1100px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <p className="editorial-label">Contact</p>
      <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">TALK TO IVORA</h1>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <form
          className="rounded-sm bg-secondary p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          {[
            ["name", "Name", "text"],
            ["email", "Email", "email"],
          ].map(([name, label, type]) => (
            <label key={name} className="mb-4 block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
              <input name={name} type={type} required className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus-ivora" />
            </label>
          ))}
          <label className="mb-6 block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Message</span>
            <textarea name="message" required rows={5} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus-ivora" />
          </label>
          <Button type="submit" variant="editorial" className="w-full">
            Send Message
          </Button>
          {sent ? <p className="mt-4 text-sm text-sage">Thank you — the IVORA team will reply within two business days.</p> : null}
        </form>
        <img
          src={campaignImages.two}
          alt="IVORA studio"
          width={1600}
          height={1200}
          loading="lazy"
          className="min-h-[420px] w-full rounded-sm object-cover"
        />
      </div>
    </main>
  );
}
