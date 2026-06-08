import { Link } from "react-router-dom";
import { SITE } from "../config";
import { PhoneIcon, PinIcon, ClockIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-brand-500/15 bg-ink-800">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-ember-600 text-lg font-black text-white">
              BA
            </span>
            <span className="font-display text-xl font-extrabold">
              Bom <span className="text-gradient">Apetite</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-orange-100/60">
            {SITE.tagline}. Cozinha angolana autêntica no coração do Morro Bento.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-300">
            Navegação
          </h4>
          <ul className="space-y-2 text-sm text-orange-100/70">
            <li>
              <Link to="/" className="hover:text-white">
                Início
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-white">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-white">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/carrinho" className="hover:text-white">
                Carrinho
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-300">
            Contactos
          </h4>
          <ul className="space-y-3 text-sm text-orange-100/70">
            <li className="flex items-center gap-2">
              <PinIcon className="h-4 w-4 text-brand-400" /> {SITE.location}
            </li>
            <li>
              <a
                href={SITE.tel}
                className="flex items-center gap-2 hover:text-white"
              >
                <PhoneIcon className="h-4 w-4 text-brand-400" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-brand-400" /> {SITE.hours}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-300">
            Faça o seu pedido
          </h4>
          <p className="mb-4 text-sm text-orange-100/60">
            Ligue ou peça pelo WhatsApp. Entregamos em todo o Morro Bento.
          </p>
          <a href={SITE.whatsapp} className="btn-primary w-full">
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-orange-100/40">
        © {new Date().getFullYear()} {SITE.name} · Morro Bento, Luanda · Todos os
        direitos reservados.
      </div>
    </footer>
  );
}
