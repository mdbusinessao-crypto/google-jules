import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { formatKz, SITE } from "../config";
import {
  buildInvoice,
  saveInvoice,
  type InvoiceCustomer,
} from "../utils/invoice";
import SectionHeading from "../components/SectionHeading";
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  CartIcon,
} from "../components/Icons";

const DELIVERY_FEE = 1000;
const TAX_RATE = 0.14;

export default function Cart() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<InvoiceCustomer>({
    name: "",
    phone: "",
    address: "",
    notes: "",
    payment: "Numerário",
  });
  const [error, setError] = useState("");

  const tax = Math.round(subtotal * TAX_RATE);
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + tax + delivery;

  function handleCheckout(e: FormEvent) {
    e.preventDefault();
    if (!lines.length) return;
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Preencha nome, telefone e morada para gerar a factura.");
      return;
    }
    setError("");
    const invoice = buildInvoice(lines, form);
    saveInvoice(invoice);
    navigate("/factura");
  }

  if (!lines.length) {
    return (
      <div className="px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl glass p-10 text-center shadow-card">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-brand-500/15">
            <CartIcon className="h-9 w-9 text-brand-300" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            O seu carrinho está vazio
          </h2>
          <p className="mt-2 text-cream/60">
            Adicione pratos deliciosos do nosso menu para começar.
          </p>
          <Link to="/menu" className="btn-primary mt-6">
            Ver Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Carrinho"
          title={
            <>
              Finalize o seu <span className="text-gradient">pedido</span>
            </>
          }
          subtitle="Os seus itens ficam guardados por 1 hora, mesmo que atualize a página."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Items */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {lines.map((l) => (
                <motion.div
                  key={l.item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 rounded-2xl glass p-4 shadow-card"
                >
                  <img
                    src={l.item.image}
                    alt={l.item.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display font-bold text-white">
                      {l.item.name}
                    </h3>
                    <p className="text-sm text-brand-300">
                      {formatKz(l.item.price)}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-3 rounded-full bg-burgundy-900/60 p-1">
                      <button
                        onClick={() => setQty(l.item.id, l.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-white hover:bg-brand-500/30"
                        aria-label="Diminuir"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center font-semibold text-white">
                        {l.qty}
                      </span>
                      <button
                        onClick={() => setQty(l.item.id, l.qty + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-white hover:bg-brand-500/30"
                        aria-label="Aumentar"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">
                      {formatKz(l.item.price * l.qty)}
                    </p>
                    <button
                      onClick={() => remove(l.item.id)}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-ember-500 hover:text-ember-600"
                    >
                      <TrashIcon className="h-4 w-4" /> Remover
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clear}
              className="text-sm text-cream/50 hover:text-ember-500"
            >
              Esvaziar carrinho
            </button>
          </div>

          {/* Checkout / summary */}
          <form
            onSubmit={handleCheckout}
            className="h-fit rounded-3xl glass p-6 shadow-card lg:sticky lg:top-28"
          >
            <h3 className="font-display text-lg font-bold text-white">
              Dados de entrega
            </h3>

            <div className="mt-4 space-y-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nome completo *"
                className="w-full rounded-xl border border-brand-500/20 bg-burgundy-900/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Telefone *"
                className="w-full rounded-xl border border-brand-500/20 bg-burgundy-900/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              />
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Morada (Morro Bento, rua...) *"
                className="w-full rounded-xl border border-brand-500/20 bg-burgundy-900/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              />
              <select
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
                className="w-full rounded-xl border border-brand-500/20 bg-burgundy-900/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              >
                <option>Numerário</option>
                <option>Multicaixa Express</option>
                <option>Transferência (TPA)</option>
              </select>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                placeholder="Observações (opcional)"
                className="w-full resize-none rounded-xl border border-brand-500/20 bg-burgundy-900/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              />
            </div>

            <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
              <Row label="Subtotal" value={formatKz(subtotal)} />
              <Row label="IVA (14%)" value={formatKz(tax)} />
              <Row label="Taxa de entrega" value={formatKz(delivery)} />
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-bold text-white">
                <span>Total</span>
                <span className="text-gradient">{formatKz(total)}</span>
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-ember-600/15 px-3 py-2 text-xs text-ember-500">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary mt-5 w-full">
              Gerar Factura
            </button>
            <a
              href={SITE.tel}
              className="mt-3 block text-center text-xs text-cream/50 hover:text-brand-300"
            >
              Ou ligue: {SITE.phoneDisplay}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-cream/70">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
