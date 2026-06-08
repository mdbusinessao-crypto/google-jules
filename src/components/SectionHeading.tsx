import Reveal from "./Reveal";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-tight tracking-tight text-cream sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-cream/60">{subtitle}</p>
      )}
    </Reveal>
  );
}
