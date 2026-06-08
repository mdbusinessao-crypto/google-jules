import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, MENU, type Category } from "../data/menu";
import MenuCard from "../components/MenuCard";
import SectionHeading from "../components/SectionHeading";

type Filter = Category | "Todos";

export default function Menu() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const filters: Filter[] = ["Todos", ...CATEGORIES];

  const items = useMemo(
    () => (filter === "Todos" ? MENU : MENU.filter((m) => m.category === filter)),
    [filter]
  );

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="O nosso menu"
          title={
            <>
              Escolha o seu <span className="text-gradient">prato</span>
            </>
          }
          subtitle="Do tradicional ao moderno — tudo preparado na hora."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f
                  ? "text-white"
                  : "text-cream/60 hover:text-white"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="menu-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-500 to-ember-600 shadow-glow"
                />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-20 grid gap-x-6 gap-y-20 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
