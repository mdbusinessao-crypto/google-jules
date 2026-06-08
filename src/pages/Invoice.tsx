import { useState } from "react";
import { Link } from "react-router-dom";
import { formatKz } from "../config";
import { useCart } from "../context/CartContext";
import {
  loadInvoice,
  RESTAURANT_INFO,
  type Invoice as InvoiceType,
} from "../utils/invoice";
import { PrintIcon, WhatsAppIcon } from "../components/Icons";
import { SITE } from "../config";

export default function Invoice() {
  const [invoice] = useState<InvoiceType | null>(() => loadInvoice());
  const { clear } = useCart();

  if (!invoice) {
    return (
      <div className="min-h-screen bg-burgundy-900 px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl glass p-10 text-center shadow-card">
          <h2 className="font-display text-2xl font-bold text-white">
            Sem factura disponível
          </h2>
          <p className="mt-2 text-cream/60">
            Faça um pedido para gerar a sua factura.
          </p>
          <Link to="/menu" className="btn-primary mt-6">
            Ver Menu
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(invoice.date);
  const dateStr = date.toLocaleString("pt-AO", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen bg-burgundy-900 px-4 py-10 print:bg-white print:py-0">
      {/* Action bar */}
      <div className="no-print mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="text-sm text-cream/70 hover:text-white"
        >
          ← Voltar ao início
        </Link>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="btn-primary">
            <PrintIcon className="h-5 w-5" /> Imprimir / PDF
          </button>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent(
              `Olá! Pedido ${invoice.number} - Total ${formatKz(invoice.total)}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Enviar
          </a>
        </div>
      </div>

      {/* Invoice sheet */}
      <div className="print-area mx-auto max-w-3xl rounded-2xl bg-white p-8 text-ink-900 shadow-card sm:p-12 print:rounded-none print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-brand-500 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-ember-600 text-lg font-black text-white">
                BA
              </span>
              <span className="font-display text-2xl font-extrabold text-ink-900">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              {RESTAURANT_INFO.address}
            </p>
            <p className="text-sm text-gray-600">
              Tel: {RESTAURANT_INFO.phone} · {RESTAURANT_INFO.email}
            </p>
            <p className="text-sm text-gray-600">
              NIF: {RESTAURANT_INFO.nif}
            </p>
          </div>
          <div className="text-right">
            <h1 className="font-display text-3xl font-black text-brand-600">
              FACTURA
            </h1>
            <p className="mt-2 text-sm font-semibold text-ink-900">
              Nº {invoice.number}
            </p>
            <p className="text-sm text-gray-600">{dateStr}</p>
          </div>
        </div>

        {/* Customer */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Cliente
            </h3>
            <p className="mt-1 font-semibold text-ink-900">
              {invoice.customer.name}
            </p>
            <p className="text-sm text-gray-600">{invoice.customer.phone}</p>
            <p className="text-sm text-gray-600">{invoice.customer.address}</p>
          </div>
          <div className="sm:text-right">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Pagamento
            </h3>
            <p className="mt-1 font-semibold text-ink-900">
              {invoice.customer.payment}
            </p>
            {invoice.customer.notes && (
              <p className="mt-1 text-sm text-gray-600">
                Obs: {invoice.customer.notes}
              </p>
            )}
          </div>
        </div>

        {/* Lines */}
        <table className="mt-8 w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-left text-gray-500">
              <th className="py-2 font-semibold">Item</th>
              <th className="py-2 text-center font-semibold">Qtd</th>
              <th className="py-2 text-right font-semibold">Preço</th>
              <th className="py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lines.map((l, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-3 font-medium text-ink-900">{l.name}</td>
                <td className="py-3 text-center text-gray-700">{l.qty}</td>
                <td className="py-3 text-right text-gray-700">
                  {formatKz(l.unitPrice)}
                </td>
                <td className="py-3 text-right font-semibold text-ink-900">
                  {formatKz(l.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <TotalRow label="Subtotal" value={formatKz(invoice.subtotal)} />
            <TotalRow
              label={`IVA (${Math.round(invoice.taxRate * 100)}%)`}
              value={formatKz(invoice.tax)}
            />
            <TotalRow
              label="Taxa de entrega"
              value={formatKz(invoice.deliveryFee)}
            />
            <div className="flex items-center justify-between border-t-2 border-brand-500 pt-3 text-lg font-black text-ink-900">
              <span>TOTAL</span>
              <span className="text-brand-600">{formatKz(invoice.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p className="font-semibold text-brand-600">
            Obrigado pela sua preferência! · Bom Apetite 🍽️
          </p>
          <p className="mt-1">
            {RESTAURANT_INFO.address} · {RESTAURANT_INFO.phone}
          </p>
        </div>
      </div>

      {/* After-print actions */}
      <div className="no-print mx-auto mt-6 max-w-3xl text-center">
        <Link
          to="/menu"
          onClick={() => clear()}
          className="text-sm text-cream/60 hover:text-brand-300"
        >
          Fazer novo pedido (limpa o carrinho)
        </Link>
      </div>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-gray-600">
      <span>{label}</span>
      <span className="font-medium text-ink-900">{value}</span>
    </div>
  );
}
