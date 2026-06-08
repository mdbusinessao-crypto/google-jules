import { motion } from "framer-motion";
import type { MenuItem } from "../data/menu";
import { formatKz } from "../config";
import { useCart } from "../context/CartContext";
import TiltCard from "./TiltCard";
import { PlusIcon, StarIcon } from "./Icons";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();

  return (
    <TiltCard className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl glass shadow-card">
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ transform: "translateZ(40px)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
          {item.popular && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold-500/90 px-2.5 py-1 text-xs font-bold text-ink-900">
              <StarIcon className="h-3 w-3" /> Popular
            </span>
          )}
          <span className="absolute right-3 top-3 rounded-full bg-ink-900/80 px-3 py-1 text-sm font-bold text-gold-400">
            {formatKz(item.price)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold text-white">
            {item.name}
          </h3>
          <p className="mt-1 flex-1 text-sm leading-relaxed text-orange-100/60">
            {item.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-brand-300/80">
              {item.category}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => add(item)}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-500 to-ember-600 px-4 py-2 text-sm font-semibold text-white shadow-glow"
            >
              <PlusIcon className="h-4 w-4" /> Adicionar
            </motion.button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
