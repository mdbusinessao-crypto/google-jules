import { useMemo } from "react";

interface ParticlesProps {
  /** which ingredient emojis to scatter */
  items?: string[];
  count?: number;
  /** seed so different sections scatter differently */
  seed?: number;
  className?: string;
}

const DEFAULT = ["🍅", "🍟", "🌿", "🧀", "🌶️", "🫒", "🥬"];

interface Speck {
  emoji: string;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  rotate: number;
}

/** Deterministic pseudo-random in [0,1) — pure, so it's render-safe. */
function rand(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Decorative, organically-scattered floating ingredient particles.
 * Purely cosmetic (aria-hidden) and hidden on mobile via `.particles-layer`.
 */
export default function Particles({
  items = DEFAULT,
  count = 14,
  seed = 1,
  className = "",
}: ParticlesProps) {
  const specks = useMemo<Speck[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      const k = (i + 1) * seed;
      return {
        emoji: items[i % items.length],
        top: rand(k) * 92,
        left: rand(k + 0.3) * 94,
        size: 18 + rand(k + 0.6) * 30,
        delay: rand(k + 0.9) * 4,
        duration: 3.5 + rand(k + 1.2) * 4,
        opacity: 0.22 + rand(k + 1.5) * 0.4,
        rotate: rand(k + 1.8) * 360,
      };
    });
  }, [items, count, seed]);

  return (
    <div
      aria-hidden
      className={`particles-layer pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {specks.map((s, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            opacity: s.opacity,
            transform: `rotate(${s.rotate}deg)`,
            animation: `drift ${s.duration}s ease-in-out ${s.delay}s infinite`,
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))",
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}
