import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { createRipple } from "../utils/ripple";
import { CartIcon, MenuBars, CloseIcon } from "./Icons";

const links = [
  { to: "/", label: "Início" },
  { to: "/menu", label: "Menu" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3">
      <div className="mx-auto max-w-7xl">
        <div
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "bg-burgundy-800/90 shadow-card backdrop-blur-md ring-1 ring-brand-500/20"
              : "bg-transparent"
          }`}
        >
          {/* Logo left */}
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-ember-500 font-display text-lg font-extrabold text-white shadow-glow">
              BA
            </span>
            <span className="font-display text-2xl font-extrabold uppercase tracking-wide text-cream">
              Bom <span className="text-brand-400">Apetite</span>
            </span>
          </Link>

          {/* Links center */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-cream/70 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-500/20 ring-1 ring-brand-400/40"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: cart + Order Now */}
          <div className="flex items-center gap-2">
            <Link
              to="/carrinho"
              className="relative grid h-11 w-11 place-items-center rounded-full bg-brand-500/15 text-cream ring-1 ring-brand-400/40 transition hover:bg-brand-500/25"
              aria-label="Carrinho"
            >
              <CartIcon className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember-500 px-1 text-xs font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link
              to="/menu"
              onClick={createRipple}
              className="relative hidden overflow-hidden rounded-full bg-gradient-to-r from-brand-400 to-brand-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-burgundy-900 shadow-glow transition hover:scale-105 active:scale-95 sm:inline-flex"
            >
              Peça Já
            </Link>

            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-cream ring-1 ring-white/10 md:hidden"
              aria-label="Menu"
            >
              {open ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-2 overflow-hidden rounded-3xl bg-burgundy-800/95 p-2 shadow-card ring-1 ring-brand-500/20 backdrop-blur-md md:hidden"
            >
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-base font-semibold uppercase tracking-wide transition ${
                      isActive
                        ? "bg-brand-500/20 text-white"
                        : "text-cream/80 hover:bg-white/5"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/menu"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-2xl bg-gradient-to-r from-brand-400 to-brand-500 px-4 py-3 text-center text-base font-bold uppercase tracking-wide text-burgundy-900"
              >
                Peça Já
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
