import { useState, type FormEvent } from "react";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { SITE } from "../config";
import {
  PhoneIcon,
  WhatsAppIcon,
  PinIcon,
  ClockIcon,
} from "../components/Icons";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = `Olá Bom Apetite! O meu nome é ${name || "(cliente)"}.%0A${encodeURIComponent(
      message
    )}`;
    window.open(`${SITE.whatsapp}?text=${text}`, "_blank");
  }

  const info = [
    {
      icon: <PinIcon className="h-5 w-5" />,
      label: "Localização",
      value: SITE.location,
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      label: "Telefone",
      value: SITE.phoneDisplay,
      href: SITE.tel,
    },
    {
      icon: <ClockIcon className="h-5 w-5" />,
      label: "Horário",
      value: SITE.hours,
    },
  ];

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contacto"
          title={
            <>
              Fale <span className="text-gradient">connosco</span>
            </>
          }
          subtitle="Encomendas, reservas ou sugestões — estamos aqui para si."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Info + map */}
          <div className="space-y-4">
            {info.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.08}>
                <div className="flex items-center gap-4 rounded-2xl glass p-5 shadow-card">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                    {it.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-cream/50">
                      {it.label}
                    </p>
                    {it.href ? (
                      <a
                        href={it.href}
                        className="font-semibold text-white hover:text-brand-300"
                      >
                        {it.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-white">{it.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-2xl glass shadow-card">
                <iframe
                  title="Mapa Morro Bento"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=13.22%2C-8.93%2C13.28%2C-8.88&layer=mapnik&marker=-8.905%2C13.25"
                  className="h-64 w-full border-0 grayscale-[0.2]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl glass p-7 shadow-card"
            >
              <h3 className="font-display text-xl font-bold text-white">
                Envie uma mensagem
              </h3>
              <p className="mt-1 text-sm text-cream/60">
                Será encaminhado para o nosso WhatsApp.
              </p>

              <label className="mt-6 block text-sm font-medium text-cream/80">
                Nome
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="O seu nome"
                className="mt-2 w-full rounded-xl border border-brand-500/20 bg-burgundy-900/60 px-4 py-3 text-white outline-none transition focus:border-brand-400"
              />

              <label className="mt-4 block text-sm font-medium text-cream/80">
                Mensagem
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Como podemos ajudar?"
                className="mt-2 w-full resize-none rounded-xl border border-brand-500/20 bg-burgundy-900/60 px-4 py-3 text-white outline-none transition focus:border-brand-400"
              />

              <button type="submit" className="btn-primary mt-6 w-full">
                <WhatsAppIcon className="h-5 w-5" /> Enviar pelo WhatsApp
              </button>
              <a href={SITE.tel} className="btn-ghost mt-3 w-full">
                <PhoneIcon className="h-5 w-5 text-brand-400" /> Ligar agora
              </a>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
