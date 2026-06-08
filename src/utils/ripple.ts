import type { MouseEvent } from "react";

/** Attach to a button/anchor onClick to render a material-style ripple. */
export function createRipple(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement("span");
  span.className = "ripple-ink";
  span.style.width = span.style.height = `${size}px`;
  span.style.left = `${e.clientX - rect.left - size / 2}px`;
  span.style.top = `${e.clientY - rect.top - size / 2}px`;
  el.appendChild(span);
  window.setTimeout(() => span.remove(), 600);
}
