# LuandaStore - Mini Loja Online (Estática)

Uma solução profissional, simples e intuitiva de e-commerce para Angola (Luanda), focada em conversão via WhatsApp e hospedagem gratuita no Netlify.

## 🚀 Funcionalidades

- **100% Responsivo:** Otimizado para telemóveis e computadores.
- **Catálogo Dinâmico:** Pesquisa em tempo real e filtros por categoria.
- **Carrinho de Compras:** Gestão local de pedidos via JavaScript.
- **Checkout WhatsApp:** Geração automática de mensagens detalhadas com os dados do cliente e lista de produtos.
- **Fácil Manutenção:** Produtos geridos através de um único ficheiro JSON.
- **Alta Performance:** Site estático ultra rápido.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Modern Flexbox/Grid), Vanilla JavaScript.
- **Persistência:** LocalStorage para o carrinho.
- **Hospedagem:** Preparado para Netlify (inclui `netlify.toml`).
- **Integração:** WhatsApp Business API (Link direto).

## 📁 Estrutura de Pastas

- `index.html`: Página inicial e catálogo de produtos.
- `product.html`: Visualização detalhada de um produto individual.
- `cart.html`: Gestão do carrinho e finalização do pedido.
- `products.json`: Ficheiro central de dados dos produtos.
- `css/`: Estilos visuais (Cores: Verde, Laranja, Preto e Branco).
- `js/`: Lógica da aplicação (Carrinho, Filtros, Checkout).
- `assets/`: Imagens e ícones.

## ⚙️ Como Personalizar

### 1. Adicionar/Editar Produtos
Abra o ficheiro `products.json` e adicione novos itens seguindo o formato:
```json
{
  "id": 1,
  "name": "Nome do Produto",
  "price": 950000,
  "oldPrice": 1100000,
  "category": "Eletrónicos",
  "description": "Descrição detalhada aqui...",
  "images": ["url_da_foto1.jpg", "url_da_foto2.jpg"],
  "tags": ["Destaque", "Novidade"]
}
```

### 2. Alterar o Número do WhatsApp
No ficheiro `js/checkout.js`, localize a variável que define o número de telefone (actualmente configurado para `+244 921225720`).

## 🌐 Hospedagem no Netlify

1. Crie uma conta em [netlify.com](https://www.netlify.com/).
2. Arraste a pasta do projecto para o painel de "Deploy" do Netlify.
3. O site estará online em segundos!

## 🧪 Testes

O projecto inclui um script de verificação automatizada usando Playwright (`verify_store.py`).
Para correr (opcional):
```bash
pip install playwright
playwright install chromium
python verify_store.py
```

---
Desenvolvido por Jules.
