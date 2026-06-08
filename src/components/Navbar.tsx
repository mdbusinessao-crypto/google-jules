import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "../config";
import { useCart } from "../context/CartContext";
import { CartIcon, MenuBars, CloseIcon, PhoneIcon } from "./Icons";

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-card" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-ember-600 text-lg font-black text-white shadow-glow">
              BA
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Bom <span className="text-gradient">Apetite</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-orange-100/70 hover:text-white"
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

          <div className="flex items-center gap-2">
            <a
              href={SITE.tel}
              className="hidden items-center gap-2 rounded-full border border-brand-500/30 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:border-brand-400 hover:bg-brand-500/10 lg:flex"
            >
              <PhoneIcon className="h-4 w-4 text-brand-400" />
              {SITE.phoneDisplay}
            </a>

            <Link
              to="/carrinho"
              className="relative grid h-11 w-11 place-items-center rounded-full bg-brand-500/15 text-white ring-1 ring-brand-400/40 transition hover:bg-brand-500/25"
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
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember-600 px-1 text-xs font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white ring-1 ring-white/10 md:hidden"
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

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-2 overflow-hidden rounded-2xl glass p-2 md:hidden"
            >
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-medium transition ${
                      isActive
                        ? "bg-brand-500/20 text-white"
                        : "text-orange-100/80 hover:bg-white/5"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={SITE.tel}
                className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-brand-300"
              >
                <PhoneIcon className="h-5 w-5" /> {SITE.phoneDisplay}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
