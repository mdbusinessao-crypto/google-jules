import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";
import TiltCard from "../components/TiltCard";
import { SITE } from "../config";

const aboutImg =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";

const stats = [
  { value: "10+", label: "Anos de tradição" },
  { value: "50k+", label: "Clientes felizes" },
  { value: "30+", label: "Pratos no menu" },
  { value: "4.9★", label: "Avaliação média" },
];

const values = [
  {
    title: "Tradição",
    desc: "Receitas angolanas passadas de geração em geração, preservando o verdadeiro sabor da nossa terra.",
    icon: "🍲",
  },
  {
    title: "Qualidade",
    desc: "Ingredientes frescos e selecionados todos os dias, sem comprometer o sabor.",
    icon: "✨",
  },
  {
    title: "Inovação",
    desc: "Um toque moderno e futurista que torna cada visita uma experiência única.",
    icon: "🚀",
  },
];

export default function About() {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sobre nós"
          title={
            <>
              A história do <span className="text-gradient">Bom Apetite</span>
            </>
          }
          subtitle="Nascido no coração do Morro Bento, o Bom Apetite une a riqueza da cozinha angolana a uma experiência moderna e acolhedora."
        />

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <Parallax offset={50}>
            <TiltCard intensity={10} className="group">
              <img
                src={aboutImg}
                alt="Cozinha Bom Apetite"
                className="w-full rounded-[2rem] shadow-card"
                style={{ transform: "translateZ(40px)" }}
              />
            </TiltCard>
          </Parallax>
          <div>
            <Reveal>
              <h3 className="font-display text-2xl font-bold text-white">
                Mais do que um restaurante, uma família.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-cream/70">
                Começámos com um sonho simples: servir comida angolana autêntica
                com o carinho de casa. Hoje, somos um ponto de encontro em Morro
                Bento, onde tradição e modernidade se encontram em cada prato.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-cream/70">
                Da muamba de galinha ao mufete, dos grelhados na brasa aos
                hambúrgueres artesanais, cada receita conta uma história de
                sabor.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/menu" className="btn-primary mt-6">
                Conheça o nosso menu
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-3xl glass p-6 text-center shadow-card">
                <div className="font-display text-3xl font-black text-gradient sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-cream/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Values */}
        <div className="mt-20">
          <SectionHeading eyebrow="Os nossos valores" title="O que nos move" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl glass p-7 shadow-card transition hover:-translate-y-1">
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/15 text-3xl">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream/60">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* contact strip */}
        <Reveal>
          <div className="mt-20 rounded-3xl glass p-8 text-center shadow-card">
            <p className="text-cream/70">
              Quer reservar uma mesa ou fazer uma encomenda especial?
            </p>
            <a href={SITE.tel} className="btn-primary mt-4">
              Ligue: {SITE.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
