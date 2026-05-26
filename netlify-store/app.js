const PRODUCTS = [
    {
        id: 1,
        name: "Relógio Minimalista Moderno",
        price: 15000,
        oldPrice: 22000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
        category: "Acessórios",
        tag: "Oferta"
    },
    {
        id: 2,
        name: "Sapatilha Running Pro",
        price: 28500,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
        category: "Calçados"
    },
    {
        id: 3,
        name: "Headphones Premium BT",
        price: 45000,
        oldPrice: 50000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
        category: "Electrónicos"
    },
    {
        id: 4,
        name: "Mochila Explorer Urban",
        price: 18000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
        category: "Acessórios"
    }
];

let cart = JSON.parse(localStorage.getItem('angolashop_cart')) || [];

const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalLabel = document.getElementById('cart-total');
const cartCountLabel = document.getElementById('cart-count');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const cancelCheckout = document.getElementById('cancel-checkout');
const whatsappForm = document.getElementById('whatsapp-form');
const searchInput = document.getElementById('search-input');

// Initialize Store
function init() {
    renderProducts(PRODUCTS);
    updateCartUI();
}

function renderProducts(products) {
    productGrid.innerHTML = products.map(product => `
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 group">
            <div class="relative mb-4 overflow-hidden rounded-xl h-64 bg-gray-100">
                ${product.tag ? `<span class="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">${product.tag}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2">
                     <button onclick="addToCart(${product.id})" class="bg-white text-black h-12 w-12 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                        <i class="fa-solid fa-cart-plus"></i>
                     </button>
                </div>
            </div>
            <div class="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">${product.category}</div>
            <h3 class="font-bold text-lg mb-2 line-clamp-1">${product.name}</h3>
            <div class="flex items-center space-x-2 mb-4">
                <span class="text-green-600 font-extrabold text-xl">${formatPrice(product.price)}</span>
                ${product.oldPrice ? `<span class="text-gray-400 line-through text-sm">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>
            <button onclick="addToCart(${product.id})" class="w-full border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-900 hover:text-white transition">
                Adicionar ao Carrinho
            </button>
        </div>
    `).join('');
}

function formatPrice(val) {
    return val.toLocaleString('pt-AO') + ' Kz';
}

// Cart Logic
window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    openCartSidebar();
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
};

window.updateQty = function(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
};

function saveCart() {
    localStorage.setItem('angolashop_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Update labels
    cartCountLabel.innerText = totalItems;
    cartCountLabel.classList.toggle('hidden', totalItems === 0);
    cartTotalLabel.innerText = formatPrice(totalPrice);
    checkoutBtn.disabled = cart.length === 0;

    // Render items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMsg.classList.remove('hidden');
    } else {
        emptyCartMsg.classList.add('hidden');
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center space-x-4 border-b pb-4">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-grow">
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-green-600 text-sm font-bold">${formatPrice(item.price)}</p>
                    <div class="flex items-center space-x-3 mt-2">
                        <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 border rounded-md flex items-center justify-center hover:bg-gray-100">-</button>
                        <span class="text-sm font-medium">${item.quantity}</span>
                        <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 border rounded-md flex items-center justify-center hover:bg-gray-100">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-500">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }
}

// Sidebar Controls
function openCartSidebar() {
    cartSidebar.classList.remove('translate-x-full');
}

function closeCartSidebar() {
    cartSidebar.classList.add('translate-x-full');
}

cartBtn.addEventListener('click', openCartSidebar);
closeCart.addEventListener('click', closeCartSidebar);

// Checkout & WhatsApp
checkoutBtn.addEventListener('click', () => {
    closeCartSidebar();
    checkoutModal.classList.remove('hidden');
});

cancelCheckout.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
});

whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;

    const WHATSAPP_NUM = '244921225720';
    let message = `*Novo Pedido - AngolaShop*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*WhatsApp:* ${phone}\n`;
    if(address) message += `*Endereço:* ${address}\n`;
    message += `\n*Produtos:*\n`;

    cart.forEach(item => {
        message += `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n*Total do Pedido: ${formatPrice(total)}*`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUM}?text=${encodedMsg}`;

    // Clear cart and redirect
    cart = [];
    saveCart();
    updateCartUI();
    checkoutModal.classList.add('hidden');

    window.open(whatsappUrl, '_blank');
});

// Search
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
    renderProducts(filtered);
});

init();
