import type { CartLine } from "../context/CartContext";
import { SITE } from "../config";

export interface InvoiceCustomer {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  payment: string;
}

export interface InvoiceLine {
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  number: string;
  date: string; // ISO
  customer: InvoiceCustomer;
  lines: InvoiceLine[];
  subtotal: number;
  taxRate: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

const TAX_RATE = 0.14; // IVA Angola 14%
const DELIVERY_FEE = 1000; // Kz
const STORAGE_KEY = "bom-apetite-invoice";

export function makeInvoiceNumber(): string {
  const d = new Date();
  const stamp =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BA-${stamp}-${rand}`;
}

export function buildInvoice(
  lines: CartLine[],
  customer: InvoiceCustomer
): Invoice {
  const invLines: InvoiceLine[] = lines.map((l) => ({
    name: l.item.name,
    qty: l.qty,
    unitPrice: l.item.price,
    total: l.qty * l.item.price,
  }));
  const subtotal = invLines.reduce((s, l) => s + l.total, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + tax + deliveryFee;

  return {
    number: makeInvoiceNumber(),
    date: new Date().toISOString(),
    customer,
    lines: invLines,
    subtotal,
    taxRate: TAX_RATE,
    tax,
    deliveryFee,
    total,
  };
}

export function saveInvoice(inv: Invoice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inv));
  } catch {
    /* ignore */
  }
}

export function loadInvoice(): Invoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Invoice) : null;
  } catch {
    return null;
  }
}

export const RESTAURANT_INFO = {
  name: SITE.name,
  address: SITE.location,
  phone: SITE.phoneDisplay,
  email: SITE.email,
  nif: "5000000000", // NIF placeholder
};
