import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE } from "../config";
import { POPULAR, MENU } from "../data/menu";
import MenuCard from "../components/MenuCard";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";
import TiltCard from "../components/TiltCard";
import {
  PhoneIcon,
  WhatsAppIcon,
  StarIcon,
  ClockIcon,
  PinIcon,
} from "../components/Icons";

const heroImg =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1100&q=80";
const pizzaImg =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80";

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 pb-10 pt-10 sm:pt-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <motion.div style={{ y: yText }} className="relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-300">
              <StarIcon className="h-3.5 w-3.5 text-gold-400" /> Sabor angolano
              em Morro Bento
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">BOM</span>
              <br />
              APETITE
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-orange-100/70">
              Pratos tradicionais, grelhados na brasa, hambúrgueres e pizzas —
              fresquinhos e quentes, entregues com um toque futurista.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/menu" className="btn-primary">
                Ver Menu
              </Link>
              <a href={SITE.tel} className="btn-ghost">
                <PhoneIcon className="h-5 w-5 text-brand-400" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-orange-100/60">
              <span className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-brand-400" /> {SITE.hours}
              </span>
              <span className="flex items-center gap-2">
                <PinIcon className="h-4 w-4 text-brand-400" /> Morro Bento
              </span>
            </div>
          </Reveal>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ y: yImg, scale: scaleImg }}
            className="relative z-10"
          >
            <TiltCard intensity={14} className="group mx-auto max-w-md">
              <motion.img
                src={heroImg}
                alt="Hambúrguer Bom Apetite"
                className="w-full rounded-[2rem] shadow-card"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transform: "translateZ(60px)" }}
              />
            </TiltCard>
          </motion.div>

          {/* glow ring */}
          <div className="absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 left-0 z-20 hidden rounded-2xl glass px-4 py-3 shadow-card sm:block"
          >
            <p className="text-xs text-orange-100/60">Avaliação dos clientes</p>
            <div className="flex items-center gap-1 text-gold-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
              <span className="ml-1 text-sm font-bold text-white">4.9</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Fresco & Quente",
    desc: "Ingredientes frescos preparados na hora, sempre quentinhos.",
    icon: "🔥",
  },
  {
    title: "Entrega Rápida",
    desc: "Entregamos em todo o Morro Bento e arredores em tempo recorde.",
    icon: "🛵",
  },
  {
    title: "Sabor Autêntico",
    desc: "Receitas tradicionais angolanas com um toque moderno.",
    icon: "🇦🇴",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Features band */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl glass p-6 text-center shadow-card transition hover:-translate-y-1">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/15 text-3xl">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-orange-100/60">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fresh, Hot & Delicious split */}
      <section className="relative overflow-hidden px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Parallax offset={60}>
            <TiltCard intensity={10} className="group">
              <img
                src={pizzaImg}
                alt="Pizza Suprema"
                className="w-full rounded-[2rem] shadow-card"
                style={{ transform: "translateZ(40px)" }}
              />
            </TiltCard>
          </Parallax>
          <div>
            <SectionHeading
              center={false}
              eyebrow="A nossa cozinha"
              title={
                <>
                  Fresco, Quente &{" "}
                  <span className="text-gradient">Delicioso</span>
                </>
              }
              subtitle="Cada prato é preparado com ingredientes selecionados e muito carinho. Da muamba ao hambúrguer, levamos o melhor de Angola à sua mesa."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/menu" className="btn-primary">
                  Explorar Menu
                </Link>
                <a href={SITE.whatsapp} className="btn-ghost">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Pedir agora
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Popular dishes */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pratos populares"
            title="Os favoritos da casa"
            subtitle="Os pratos mais pedidos pelos nossos clientes em Morro Bento."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <MenuCard item={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/menu" className="btn-ghost">
              Ver menu completo ({MENU.length} pratos)
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 py-16">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-ember-600 to-brand-700 p-10 text-center shadow-glow sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
            <h2 className="relative font-display text-3xl font-black text-white sm:text-5xl">
              Com fome? Estamos a um toque de distância.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">
              Faça já o seu pedido por telefone ou WhatsApp e receba em casa.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.tel}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-ember-700 shadow-lg transition hover:scale-105"
              >
                <PhoneIcon className="h-5 w-5" /> {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsapp}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900/30 px-7 py-3 font-bold text-white ring-1 ring-white/40 transition hover:scale-105"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
