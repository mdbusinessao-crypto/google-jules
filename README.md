# 🇦🇴 AngolaShop - Mini Loja Online (WhatsApp Centric)

Este projeto é uma solução completa e profissional para uma mini loja online focada no mercado de Angola (Luanda/Talatona).

## 🌟 Características
- **100% Responsivo:** Otimizado para telemóveis.
- **WhatsApp Direct:** Conversão focada no contacto direto.
- **Catálogo Dinâmico:** Filtros por categoria, preço e pesquisa.
- **Carrinho Persistente:** Os itens não desaparecem ao recarregar.
- **Registo de Pedidos:** Integração com Netlify Forms (atua como Painel Administrativo).

---

## 🛠️ Opções de Implementação

### Opção A: Versão Estática (Recomendada para Netlify)
Ideal para quem quer velocidade máxima e custo zero de alojamento.
- **Ficheiros:** `index.html`, `app.js`, `styles.css`, `products.json`.
- **Guia de Publicação:** Veja [DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md).

### Opção B: WordPress + WooCommerce
Ideal para quem precisa de gestão de stock avançada e multi-vendedor futuramente.
- **Assets:** Localizados na pasta `wordpress-version/`.
- **Instruções:** Veja o ficheiro `wordpress-version/SETUP_GUIDE.md`.

---

## 📦 Gestão de Produtos (Versão Estática)
Para adicionar ou remover produtos, basta editar o ficheiro `products.json`.
Estrutura:
```json
{
  "id": 1,
  "name": "Nome do Produto",
  "price": 50000,
  "category": "Electrónicos",
  "images": ["url_da_foto"],
  "description": "Descrição detalhada..."
}
```

## 📱 Configuração WhatsApp
O número configurado é **+244 921 225 720**.
Para alterar, edite a variável `WHATSAPP_NUM` no ficheiro `app.js`.

---
*Desenvolvido para máxima conversão e simplicidade.*
