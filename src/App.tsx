import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";

export default function App() {
  const location = useLocation();
  const isInvoice = location.pathname === "/factura";

  return (
    <div className="relative min-h-screen bg-ink-900 bg-grid">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-radial-fade" />
      {!isInvoice && <Navbar />}
      <main className={isInvoice ? "" : "pt-20"}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {!isInvoice && <Footer />}
      {!isInvoice && <FloatingCTA />}
    </div>
  );
}
