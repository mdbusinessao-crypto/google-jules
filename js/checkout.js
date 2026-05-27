document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    setupCheckoutModal();
});

async function renderCart() {
    const container = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('cart-summary-container');
    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-basket-shopping" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                <h2>Seu carrinho está vazio</h2>
                <p>Que tal dar uma olhada nos nossos produtos?</p>
                <a href="index.html#produtos" class="btn btn-primary" style="margin-top: 20px;">Ver Catálogo</a>
            </div>
        `;
        summaryContainer.style.display = 'none';
        return;
    }

    try {
        const response = await fetch('products.json');
        const allProducts = await response.json();

        let subtotal = 0;
        let html = '<div class="cart-items">';

        cart.forEach(item => {
            const product = allProducts.find(p => p.id === item.id);
            if (product) {
                const itemTotal = product.price * item.quantity;
                subtotal += itemTotal;

                html += `
                    <div class="cart-item">
                        <img src="${product.images[0]}" alt="${product.name}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h3>${product.name}</h3>
                            <p class="cart-item-price">${product.price.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}</p>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button onclick="updateQuantity(${product.id}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart(${product.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }
        });

        html += '</div>';
        container.innerHTML = html;

        document.getElementById('cart-subtotal').textContent = `${subtotal.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}`;
        document.getElementById('cart-total').textContent = `${subtotal.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}`;
        summaryContainer.style.display = 'block';

    } catch (error) {
        console.error('Erro ao renderizar carrinho:', error);
        container.innerHTML = '<p>Erro ao carregar os itens do carrinho.</p>';
    }
}

function setupCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const btn = document.getElementById('btn-open-checkout');
    const span = document.getElementsByClassName('close-modal')[0];
    const form = document.getElementById('checkout-form');

    if (btn) {
        btn.onclick = () => modal.style.display = 'block';
    }

    if (span) {
        span.onclick = () => modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();

            const name = document.getElementById('full-name').value;
            const whatsapp = document.getElementById('whatsapp-number').value;
            const address = document.getElementById('delivery-address').value;

            const cart = getCart();
            const response = await fetch('products.json');
            const allProducts = await response.json();

            let message = `*Novo Pedido - ${CONFIG.STORE_NAME}*\n\n`;
            message += `*Cliente:* ${name}\n`;
            message += `*WhatsApp:* ${whatsapp}\n`;
            if (address) message += `*Endereço:* ${address}\n`;
            message += `\n*Produtos:*\n`;

            let total = 0;
            cart.forEach(item => {
                const product = allProducts.find(p => p.id === item.id);
                if (product) {
                    const itemTotal = product.price * item.quantity;
                    total += itemTotal;
                    message += `- ${product.name} (x${item.quantity}): ${itemTotal.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}\n`;
                }
            });

            message += `\n*Total Geral: ${total.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}*`;

            // Log for Netlify (optional, can be improved with a real form submission)
            console.log('Pedido processado para:', name);

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            // Register order in history
            registerOrder({
                customer: { name, whatsapp, address },
                items: cart.map(item => {
                    const p = allProducts.find(prod => prod.id === item.id);
                    return { id: item.id, name: p.name, quantity: item.quantity, price: p.price };
                }),
                total: total,
                date: new Date().toISOString()
            });

            // Clear cart and redirect
            localStorage.removeItem('luanda_store_cart');
            alert('Pedido enviado! Você será redirecionado para o WhatsApp.');
            window.location.href = 'index.html';
        };
    }
}

function registerOrder(order) {
    const orders = JSON.parse(localStorage.getItem('luanda_store_orders') || '[]');
    orders.push(order);
    localStorage.setItem('luanda_store_orders', JSON.stringify(orders));
}
