import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { MenuItem } from "../data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: "ADD"; item: MenuItem; qty?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; lines: CartLine[] };

const STORAGE_KEY = "bom-apetite-cart";
// Cache validity: 1 hour
const CACHE_TTL_MS = 60 * 60 * 1000;

interface PersistedCart {
  lines: CartLine[];
  savedAt: number;
}

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PersistedCart;
    if (!parsed.savedAt || Date.now() - parsed.savedAt > CACHE_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return Array.isArray(parsed.lines) ? parsed.lines : [];
  } catch {
    return [];
  }
}

function saveCart(lines: CartLine[]) {
  try {
    const payload: PersistedCart = { lines, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode errors */
  }
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { lines: action.lines };
    case "ADD": {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.item.id === action.item.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.item.id === action.item.id ? { ...l, qty: l.qty + qty } : l
          ),
        };
      }
      return { lines: [...state.lines, { item: action.item, qty }] };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.item.id !== action.id) };
    case "SET_QTY":
      return {
        lines: state.lines
          .map((l) =>
            l.item.id === action.id ? { ...l, qty: Math.max(0, action.qty) } : l
          )
          .filter((l) => l.qty > 0),
      };
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: MenuItem, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  // Hydrate from cache (respecting 1h TTL) on mount
  useEffect(() => {
    const lines = loadCart();
    if (lines.length) dispatch({ type: "HYDRATE", lines });
  }, []);

  // Persist on every change
  useEffect(() => {
    saveCart(state.lines);
  }, [state.lines]);

  // Sync across browser tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        dispatch({ type: "HYDRATE", lines: loadCart() });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = state.lines.reduce(
      (s, l) => s + l.qty * l.item.price,
      0
    );
    return {
      lines: state.lines,
      count,
      subtotal,
      add: (item, qty) => dispatch({ type: "ADD", item, qty }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
