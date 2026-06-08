import { motion } from "framer-motion";
import type { MenuItem } from "../data/menu";
import { formatKz } from "../config";
import { useCart } from "../context/CartContext";
import { createRipple } from "../utils/ripple";
import { ArrowRight, StarIcon } from "./Icons";

/**
 * Product card matching the reference: circular food image on top, name,
 * short description, price and an arrow CTA that adds to the cart.
 * Hover lifts the card and scales the image.
 */
export default function MenuCard({ item }: { item: MenuItem }) {
  const { add } = useCart();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col items-center rounded-3xl bg-offwhite px-5 pb-6 pt-16 text-center shadow-card"
    >
      {/* Circular image */}
      <div className="absolute -top-12 h-28 w-28 overflow-hidden rounded-full ring-4 ring-cream shadow-food">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {item.popular && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-500/15 px-2.5 py-1 text-xs font-bold text-ember-600">
          <StarIcon className="h-3 w-3 text-brand-500" /> Popular
        </span>
      )}

      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-burgundy-800">
        {item.name}
      </h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-burgundy-900/55">
        {item.description}
      </p>

      <div className="mt-4 flex w-full items-center justify-between">
        <span className="font-display text-2xl font-extrabold text-ember-600">
          {formatKz(item.price)}
        </span>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={(e) => {
            createRipple(e);
            add(item);
          }}
          aria-label={`Adicionar ${item.name}`}
          className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-ember-500 text-white shadow-glow transition group-hover:scale-105"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
