# Guia de Implementação: Mini Loja Angola (WhatsApp)

Este guia detalha o passo a passo para configurar uma mini loja online profissional otimizada para o mercado de Luanda, Talatona, com foco em conversão via WhatsApp.

## 1. Estrutura Técnica Recomendada
*   **Plataforma:** WordPress
*   **E-commerce:** WooCommerce
*   **Tema:** [Astra](https://wpastra.com/) (Leve, rápido e altamente customizável)
*   **Multi-vendedor:** [Dokan Lite](https://wordpress.org/plugins/dokan-lite/) (Para suporte inicial a múltiplos vendedores)
*   **WhatsApp Integration:** [Order on Mobile for WooCommerce](https://wordpress.org/plugins/woo-order-on-whatsapp/) (Gratuito e eficiente)

## 2. Passo a Passo de Instalação

### Passo A: Configuração Base
1.  Instale o WordPress no seu servidor.
2.  No painel administrativo, vá em **Aparência > Temas** e instale o tema **Astra**.
3.  Vá em **Plugins > Adicionar Novo** e instale:
    *   WooCommerce
    *   Dokan (opcional para multi-vendedor)
    *   Order on Mobile for WooCommerce

### Passo B: Configuração do WooCommerce
1.  Siga o assistente de configuração do WooCommerce.
2.  Em **Pagamentos**, ative apenas **Transferência Bancária** e **Pagamento na Entrega (Cash on Delivery)**.
3.  Configure a moeda para **Kwanza (Kz)** em `WooCommerce > Configurações > Geral`.

### Passo C: Configuração do WhatsApp
1.  Vá em `WooCommerce > Settings > Order on WhatsApp`.
2.  Insira o número principal: `244921225720`.
3.  Ative a opção de criar o pedido no painel administrativo antes de redirecionar para o WhatsApp (isso garante o registo no painel admin).

## 3. Customização de Design (Cores: Verde, Branco, Laranja, Preto)
Para aplicar a identidade visual profissional, copie o conteúdo do arquivo `custom-styles.css` e cole em:
**Aparência > Personalizar > CSS Adicional**.

## 4. Lógica Personalizada (Mensagens Automáticas)
Para uma integração mais profunda (como a mensagem de checkout personalizada que criamos), adicione o conteúdo do arquivo `functions-whatsapp.php` ao arquivo `functions.php` do seu tema filho (child theme) ou use um plugin como o **Code Snippets**.

**Funcionalidades incluídas no código:**
*   Botão "Comprar no WhatsApp" na página individual do produto.
*   Botão de finalização rápida no Carrinho.
*   Redirecionamento automático/manual na página de agradecimento com todos os dados do pedido formatados.

## 5. Gestão de Pedidos (Painel Admin)
*   Todos os pedidos feitos via WhatsApp serão registados em `WooCommerce > Pedidos`.
*   Você poderá alterar o status (Novo, Confirmado, Enviado, Entregue, Cancelado) diretamente no painel.
*   O plugin **Dokan** permitirá que cada vendedor veja apenas os seus pedidos no painel deles.

## 6. Otimização para Angola
*   **Velocidade:** O tema Astra com WooCommerce sem muitos plugins pesados garante um carregamento rápido em redes móveis (3G/4G).
*   **SEO:** Use o plugin **Yoast SEO** ou **Rank Math** para configurar os títulos e descrições focados em "Loja Online Luanda" e "Entregas em Talatona".

---
*Desenvolvido para: AngolaShop - Luanda, Talatona*
*Suporte: +244 921 225 720*
