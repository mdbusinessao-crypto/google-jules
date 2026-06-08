export type Category =
  | "Pratos Tradicionais"
  | "Grelhados"
  | "Hambúrgueres"
  | "Pizzas"
  | "Acompanhamentos"
  | "Bebidas"
  | "Sobremesas";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in Kwanza
  category: Category;
  image: string;
  tags?: string[];
  popular?: boolean;
}

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES: Category[] = [
  "Pratos Tradicionais",
  "Grelhados",
  "Hambúrgueres",
  "Pizzas",
  "Acompanhamentos",
  "Bebidas",
  "Sobremesas",
];

export const MENU: MenuItem[] = [
  {
    id: "muamba-galinha",
    name: "Muamba de Galinha",
    description:
      "Galinha cozida em óleo de palma, quiabo e gindungo, servida com funge fresco.",
    price: 6500,
    category: "Pratos Tradicionais",
    image: img("photo-1604908176997-125f25cc6f3d"),
    tags: ["Tradicional", "Picante"],
    popular: true,
  },
  {
    id: "calulu-peixe",
    name: "Calulu de Peixe",
    description:
      "Peixe seco e fresco com legumes, óleo de palma e folhas verdes. Pura tradição.",
    price: 7000,
    category: "Pratos Tradicionais",
    image: img("photo-1567620905732-2d1ec7ab7445"),
    tags: ["Tradicional"],
    popular: true,
  },
  {
    id: "mufete",
    name: "Mufete Completo",
    description:
      "Peixe grelhado no carvão com feijão de óleo de palma, banana e batata-doce.",
    price: 8500,
    category: "Pratos Tradicionais",
    image: img("photo-1535140728325-a4d3707eee61"),
    tags: ["Assinatura"],
    popular: true,
  },
  {
    id: "frango-grelhado",
    name: "Frango Grelhado na Brasa",
    description:
      "Meio frango marinado em piri-piri da casa, grelhado lentamente na brasa.",
    price: 5500,
    category: "Grelhados",
    image: img("photo-1598103442097-8b74394b95c6"),
    tags: ["Brasa"],
  },
  {
    id: "espetada-mista",
    name: "Espetada Mista",
    description:
      "Espetadas de vaca, frango e legumes grelhados, servidas com molho da casa.",
    price: 6800,
    category: "Grelhados",
    image: img("photo-1529193591184-b1d58069ecdd"),
  },
  {
    id: "burger-bom-apetite",
    name: "Burger Bom Apetite",
    description:
      "Duplo hambúrguer de vaca, cheddar derretido, alface, tomate e molho secreto.",
    price: 4500,
    category: "Hambúrgueres",
    image: img("photo-1568901346375-23c9450c58cd"),
    tags: ["Best-seller"],
    popular: true,
  },
  {
    id: "burger-frango",
    name: "Crispy Chicken Burger",
    description:
      "Frango panado crocante, maionese de alho e pickles num pão brioche.",
    price: 4000,
    category: "Hambúrgueres",
    image: img("photo-1550547660-d9450f859349"),
  },
  {
    id: "pizza-margherita",
    name: "Pizza Margherita",
    description:
      "Molho de tomate San Marzano, mozzarella fresca e manjericão.",
    price: 5000,
    category: "Pizzas",
    image: img("photo-1574071318508-1cdbab80d002"),
  },
  {
    id: "pizza-suprema",
    name: "Pizza Suprema",
    description:
      "Pepperoni, fiambre, cogumelos, pimentos e cebola sobre queijo derretido.",
    price: 6200,
    category: "Pizzas",
    image: img("photo-1513104890138-7c749659a591"),
    popular: true,
  },
  {
    id: "funge",
    name: "Funge de Bombó",
    description: "Acompanhamento angolano clássico, cremoso e tradicional.",
    price: 1500,
    category: "Acompanhamentos",
    image: img("photo-1606756790138-261d2b21cd75"),
  },
  {
    id: "batata-frita",
    name: "Batata Frita Crocante",
    description: "Batatas douradas e crocantes, polvilhadas com sal marinho.",
    price: 1800,
    category: "Acompanhamentos",
    image: img("photo-1573080496219-bb080dd4f877"),
  },
  {
    id: "sumo-natural",
    name: "Sumo Natural de Múcua",
    description: "Sumo natural de fruta angolana, refrescante e gelado.",
    price: 1200,
    category: "Bebidas",
    image: img("photo-1621263764928-df1444c5e859"),
  },
  {
    id: "agua",
    name: "Água Mineral",
    description: "Garrafa de água mineral 500ml.",
    price: 500,
    category: "Bebidas",
    image: img("photo-1560023907-5f339617ea30"),
  },
  {
    id: "cocktail",
    name: "Cocktail da Casa",
    description: "Mistura tropical de frutas com um toque especial.",
    price: 2500,
    category: "Bebidas",
    image: img("photo-1551024506-0bccd828d307"),
  },
  {
    id: "cocada",
    name: "Cocada Amarela",
    description: "Doce tradicional angolano de coco e gemas.",
    price: 2000,
    category: "Sobremesas",
    image: img("photo-1488477181946-6428a0291777"),
  },
  {
    id: "mousse-chocolate",
    name: "Mousse de Chocolate",
    description: "Mousse cremosa de chocolate belga com raspas de cacau.",
    price: 2200,
    category: "Sobremesas",
    image: img("photo-1541783245831-57d6fb0926d3"),
  },
];

export const POPULAR = MENU.filter((m) => m.popular);
