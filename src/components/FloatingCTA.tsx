import { motion } from "framer-motion";
import { SITE } from "../config";
import { WhatsAppIcon } from "./Icons";

export default function FloatingCTA() {
  return (
    <motion.a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="no-print fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_30px_-4px_rgba(37,211,102,0.8)]"
      aria-label="Falar no WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
