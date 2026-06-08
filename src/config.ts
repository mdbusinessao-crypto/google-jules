export const SITE = {
  name: "Bom Apetite",
  tagline: "Sabores de Angola, com um toque futurista",
  phoneDisplay: "921 225 720",
  phoneRaw: "921225720",
  phoneIntl: "+244921225720",
  whatsapp: "https://wa.me/244921225720",
  tel: "tel:+244921225720",
  location: "Morro Bento, Luanda — Angola",
  email: "geral@bomapetite.ao",
  hours: "Seg — Dom · 10h00 — 23h00",
  currency: "Kz",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
} as const;

export function formatKz(value: number): string {
  return (
    new Intl.NumberFormat("pt-AO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value) + " Kz"
  );
}
