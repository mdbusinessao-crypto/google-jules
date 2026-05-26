# 🚀 Como Publicar a sua Loja no Netlify

Este guia explica como colocar a sua loja online rapidamente no ar usando o Netlify.

## Passo 1: Preparar os Ficheiros
Certifique-se de que os seguintes ficheiros estão na pasta raiz do seu projeto:
- `index.html`
- `app.js`
- `styles.css`
- `products.json`
- `netlify.toml`
- `_redirects`

## Passo 2: Publicação (Manual - Mais Rápido)
1. Crie uma conta em [Netlify.com](https://www.netlify.com/).
2. Vá para a secção **Sites**.
3. Arraste e solte a pasta principal do projeto (onde está o `index.html`) para a área de upload ("Drag and drop your site folder here").
4. O Netlify irá gerar um link (ex: `loja-angola-123.netlify.app`).

## Passo 3: Configurar o "Painel Administrativo" (Netlify Forms)
A sua loja já está configurada para registar pedidos automaticamente.
1. No painel do seu site no Netlify, vá a **Site configuration** > **Forms**.
2. Verifique se os Forms estão ativos.
3. Sempre que um cliente finalizar um pedido, os dados aparecerão em **Deploys** > **Forms submissions**.
4. Pode configurar notificações por Email para cada novo pedido em **Forms** > **Form notifications**.

## Passo 4: Personalizar o Domínio
1. Em **Domain settings**, pode alterar o nome gratuito do Netlify ou adicionar o seu próprio domínio (ex: `www.sualoja.ao`).

---
**Dica Profissional:** Para atualizar os produtos, basta editar o ficheiro `products.json` e fazer um novo upload da pasta.
