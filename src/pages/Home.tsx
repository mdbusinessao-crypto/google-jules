import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE } from "../config";
import { POPULAR, MENU } from "../data/menu";
import MenuCard from "../components/MenuCard";
import Reveal from "../components/Reveal";
import Particles from "../components/Particles";
import TiltCard from "../components/TiltCard";
import { createRipple } from "../utils/ripple";
import { PhoneIcon, ArrowRight, StarIcon } from "../components/Icons";

const burger =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80";
const pizza =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80";
const burgers3 = [
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=600&q=80",
];

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // parallax: food moves slower than scroll
  const yFood = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yPizza = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="section-burgundy relative overflow-hidden px-4 pb-24 pt-28 sm:pt-36"
    >
      <Particles count={12} seed={2} />
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2">
        <motion.div style={{ y: yText }} className="relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              <StarIcon className="h-3.5 w-3.5 text-brand-400" /> Quente • Morro
              Bento
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-7xl font-extrabold uppercase leading-[0.85] tracking-tight text-cream sm:text-8xl lg:text-9xl">
              <span className="text-brand-400">Pizza</span> &<br />
              Burger
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-cream/70">
              Pizzas, hambúrgueres e os sabores de Angola — fresquinhos, quentes
              e entregues à sua porta no Morro Bento.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/menu" onClick={createRipple} className="btn-primary">
                Peça Já <ArrowRight className="h-5 w-5" />
              </Link>
              <a href={SITE.tel} onClick={createRipple} className="btn-ghost">
                <PhoneIcon className="h-5 w-5 text-brand-400" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </motion.div>

        {/* Floating food */}
        <div className="relative h-[360px] sm:h-[460px]">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl sm:h-96 sm:w-96" />

          <motion.div
            style={{ y: yPizza }}
            className="absolute right-4 top-0 z-0 w-44 sm:w-60"
          >
            <img
              src={pizza}
              alt="Pizza"
              className="animate-floatBig rounded-full shadow-food"
            />
          </motion.div>

          <motion.div
            style={{ y: yFood }}
            className="absolute bottom-0 left-1/2 z-10 w-64 -translate-x-1/2 sm:w-80"
          >
            <TiltCard intensity={12} glare={false} className="group">
              <img
                src={burger}
                alt="Hambúrguer Bom Apetite"
                className="rounded-[2rem] shadow-food"
                style={{ transform: "translateZ(50px)" }}
              />
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 left-2 z-20 rounded-2xl bg-burgundy-800/80 px-4 py-3 ring-1 ring-brand-500/30 backdrop-blur-md"
          >
            <div className="flex items-center gap-1 text-brand-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
              <span className="ml-1 text-sm font-bold text-cream">4.9</span>
            </div>
            <p className="text-xs text-cream/60">+50 mil clientes</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Fresh, Hot & Delicious (cream) ---------------- */
function FreshHot() {
  return (
    <section className="section-cream relative overflow-hidden px-4 py-24">
      <Particles count={12} seed={5} />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-burgundy-800 sm:text-7xl">
            Fresco, Quente &{" "}
            <span className="text-ember-500">Delicioso</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-burgundy-900/60">
            Cada prato é preparado na hora com ingredientes selecionados. Da
            muamba ao hambúrguer artesanal, levamos o melhor à sua mesa.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            to="/menu"
            onClick={createRipple}
            className="btn-primary mt-7"
          >
            Ver Menu <ArrowRight className="h-5 w-5" />
          </Link>
        </Reveal>

        {/* 3 centered burgers */}
        <div className="mt-14 flex items-end justify-center gap-4 sm:gap-10">
          {burgers3.map((src, i) => (
            <Reveal key={src} delay={0.1 + i * 0.1}>
              <motion.img
                src={src}
                alt={`Hambúrguer ${i + 1}`}
                loading="lazy"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className={`rounded-full object-cover shadow-food ring-4 ring-white ${
                  i === 1
                    ? "h-40 w-40 sm:h-56 sm:w-56"
                    : "h-28 w-28 sm:h-44 sm:w-44"
                }`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Product grid (amber) ---------------- */
function ProductGrid() {
  return (
    <section className="section-amber relative overflow-hidden px-4 py-24">
      <Particles count={14} seed={8} />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center">
          <span className="inline-block rounded-full bg-burgundy-800/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-burgundy-800">
            O nosso menu
          </span>
          <h2 className="mt-4 font-display text-5xl font-extrabold uppercase tracking-tight text-burgundy-900 sm:text-6xl">
            Pratos Populares
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <MenuCard item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/menu"
            onClick={createRipple}
            className="btn-dark"
          >
            Ver menu completo ({MENU.length} pratos)
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features + CTA ---------------- */
const features = [
  { title: "Fresco & Quente", desc: "Preparado na hora, sempre quentinho.", icon: "🔥" },
  { title: "Entrega Rápida", desc: "Em todo o Morro Bento e arredores.", icon: "🛵" },
  { title: "Sabor Autêntico", desc: "Receitas angolanas com toque moderno.", icon: "🇦🇴" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <FreshHot />
      <ProductGrid />

      {/* Features */}
      <section className="section-burgundy px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl glass p-7 text-center transition hover:-translate-y-1">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/15 text-3xl">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-cream">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-cream/60">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-burgundy px-4 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ember-500 via-ember-600 to-burgundy-700 p-10 text-center shadow-glow sm:p-16">
            <Particles count={8} seed={11} />
            <h2 className="relative font-display text-4xl font-extrabold uppercase text-white sm:text-6xl">
              Com fome? Peça agora.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">
              Faça o seu pedido por telefone ou WhatsApp e receba em casa.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.tel}
                onClick={createRipple}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3 font-bold text-ember-600 shadow-lg transition hover:scale-105 active:scale-95"
              >
                <PhoneIcon className="h-5 w-5" /> {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsapp}
                onClick={createRipple}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-burgundy-900/40 px-7 py-3 font-bold text-white ring-1 ring-white/40 transition hover:scale-105 active:scale-95"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
