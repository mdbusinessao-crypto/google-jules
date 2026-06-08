import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import { createRipple } from "./utils/ripple";
import { ArrowRight } from "./components/Icons";

export default function App() {
  const location = useLocation();
  const isInvoice = location.pathname === "/factura";
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen bg-burgundy-900">
      {!isInvoice && <Navbar />}
      <main className={isInvoice || isHome ? "" : "pt-24"}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!isInvoice && <Footer />}
      {!isInvoice && <FloatingCTA />}

      {/* Mobile sticky Order Now */}
      {!isInvoice && (
        <Link
          to="/menu"
          onClick={createRipple}
          className="no-print fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-400 to-brand-500 py-4 text-base font-bold uppercase tracking-wide text-burgundy-900 shadow-glow active:scale-95 sm:hidden"
        >
          Peça Já <ArrowRight className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}
