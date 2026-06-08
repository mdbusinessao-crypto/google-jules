# Bom Apetite — Restaurante (Morro Bento, Luanda)

Website multipágina para o restaurante **Bom Apetite**, em Morro Bento, Luanda
(Angola). Cozinha angolana autêntica com uma estética futurista e discreta.

Construído com **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.

## Funcionalidades

- **Multipágina e responsivo** (telemóvel, tablet, desktop): Início, Menu,
  Sobre, Contacto, Carrinho e Factura.
- **Efeitos modernos**: parallax no scroll, animações de entrada (motion) e
  cartões com inclinação **3D** (tilt) nas imagens — tudo com Framer Motion.
- **Carrinho de compras** com persistência em `localStorage` e **cache de 1
  hora**: mesmo que o cliente atualize a página, os itens mantêm-se (expiram
  automaticamente após 60 minutos).
- **Factura automática** gerada a partir do carrinho, com IVA (14%) e taxa de
  entrega, **pronta para impressão / PDF** (`window.print()`).
- **CTAs** ligados ao número **921 225 720** (chamada e WhatsApp).

## Desenvolvimento

```bash
npm install     # instalar dependências
npm run dev     # servidor de desenvolvimento (http://localhost:5173)
npm run build   # build de produção (tsc + vite build)
npm run lint    # ESLint
npm run preview # pré-visualizar o build
```

## Estrutura

```
src/
  components/   # Navbar, Footer, TiltCard, Parallax, Reveal, MenuCard, ...
  context/      # CartContext (carrinho + cache de 1h)
  data/         # menu.ts (pratos)
  pages/        # Home, Menu, About, Contact, Cart, Invoice, NotFound
  utils/        # invoice.ts (geração da factura)
  config.ts     # dados do restaurante (contacto, moeda, etc.)
```

## Configuração

Os dados do restaurante (nome, telefone, morada, horário) estão centralizados em
`src/config.ts`. O menu é editável em `src/data/menu.ts`. A taxa de IVA, a taxa
de entrega e o tempo de cache estão em `src/utils/invoice.ts` e
`src/context/CartContext.tsx`.
