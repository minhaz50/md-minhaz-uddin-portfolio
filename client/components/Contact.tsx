import dynamic from "next/dynamic";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { profile } from "@/data/site";
import Reveal from "@/components/Reveal";
import { ContactFormSkeleton } from "@/components/Skeletons";

// Lazy-loaded: the form's JavaScript is split into its own chunk and only
// fetched when this section renders, with a skeleton shown in the meantime.
const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => <ContactFormSkeleton />,
});

export default function Contact() {
  const cards = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
      Icon: Phone,
    },
    {
      label: "WhatsApp",
      value: profile.whatsapp,
      href: `https://wa.me/${profile.whatsapp.replace(/[^\d]/g, "")}`,
      Icon: MessageCircle,
    },
  ];

  return (
    <section id="contact" className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="path-label mb-3">contact</p>
          <h2 className="mb-3 text-2xl font-bold text-paper sm:text-3xl">Let&apos;s talk</h2>
          <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-paper-dim">
            Have a project in mind, a role to discuss, or just want to say hi? My inbox is open.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {cards.map(({ label, value, href, Icon }, i) => (
              <Reveal key={label} variant="left" delay={i * 100}>
                <a
                  href={href}
                  target={label === "WhatsApp" ? "_blank" : undefined}
                  rel={label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className="group block h-full rounded-xl border border-surface-border bg-surface p-6 transition hover:border-mint/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-amber transition group-hover:text-mint">
                    <Icon size={18} />
                  </div>
                  <p className="mt-4 font-mono text-xs text-paper-faint">{label}</p>
                  <p className="mt-1 text-sm font-medium break-all text-paper">{value}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal variant="right" delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
