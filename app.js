let PRODUCTS = [];
let cart = JSON.parse(localStorage.getItem('angolashop_cart')) || [];
let currentCategory = 'all';

// Selectors
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
const whatsappForm = document.getElementById('whatsapp-form');
const searchInput = document.getElementById('search-input');
const priceFilter = document.getElementById('price-filter');
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
const catTitle = document.getElementById('cat-title');

// Init
async function init() {
    try {
        const response = await fetch('products.json');
        PRODUCTS = await response.json();
        renderProducts(PRODUCTS);
        updateCartUI();
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        productGrid.innerHTML = `<div class="col-span-full py-20 text-center text-red-500 font-bold">Erro ao carregar o catálogo. Por favor, tente mais tarde.</div>`;
    }
}

function renderProducts(products) {
    if (products.length === 0) {
        productGrid.innerHTML = `<div class="col-span-full py-20 text-center text-gray-400 font-medium">Nenhum produto encontrado nesta seleção.</div>`;
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 p-4 group cursor-pointer border border-gray-100" onclick="openProductModal(${product.id})">
            <div class="relative mb-6 overflow-hidden rounded-2xl h-64 bg-gray-50">
                ${product.tag ? `<span class="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full z-10 uppercase tracking-widest">${product.tag}</span>` : ''}
                <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-1000">
                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition"></div>
            </div>
            <div class="px-2">
                <div class="text-[10px] text-gray-400 font-black mb-1 uppercase tracking-[0.2em]">${product.category}</div>
                <h3 class="font-black text-lg mb-2 line-clamp-1 group-hover:text-green-600 transition tracking-tight">${product.name}</h3>
                <div class="flex items-center space-x-3 mb-6">
                    <span class="text-green-600 font-black text-xl">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="text-gray-300 line-through text-sm font-bold">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                <button onclick="event.stopPropagation(); addToCart(${product.id})" class="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-green-600 transition transform active:scale-95 shadow-lg shadow-gray-900/10">
                    Adicionar
                </button>
            </div>
        </div>
    `).join('');
}

function formatPrice(val) {
    return val.toLocaleString('pt-AO') + ' Kz';
}

// Filtering
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const priceRange = priceFilter.value;

    let filtered = PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;

        let matchesPrice = true;
        if (priceRange === '0-20000') matchesPrice = p.price <= 20000;
        else if (priceRange === '20000-100000') matchesPrice = p.price > 20000 && p.price <= 100000;
        else if (priceRange === '100000+') matchesPrice = p.price > 100000;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    catTitle.innerText = currentCategory === 'all' ? 'Novidades & Mais Vendidos' : currentCategory;
    renderProducts(filtered);
}

window.filterByCategory = function(category) {
    currentCategory = category;
    applyFilters();
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
};

window.resetFilters = function() {
    currentCategory = 'all';
    searchInput.value = '';
    priceFilter.value = 'all';
    applyFilters();
};

searchInput.addEventListener('input', applyFilters);
priceFilter.addEventListener('change', applyFilters);

// Product Modal
window.openProductModal = function(id) {
    const p = PRODUCTS.find(x => x.id === id);
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100">
                <img src="${p.images[0]}" id="main-modal-img" class="w-full h-full object-cover">
            </div>
            <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                ${p.images.map((img, i) => `
                    <img src="${img}" onclick="document.getElementById('main-modal-img').src='${img}'" class="w-24 h-24 object-cover rounded-2xl cursor-pointer border-2 border-transparent hover:border-green-600 transition flex-shrink-0">
                `).join('')}
            </div>
        </div>
        <div class="flex flex-col justify-center">
            <span class="text-green-600 font-black uppercase tracking-[0.2em] text-xs mb-4">${p.category}</span>
            <h2 class="text-4xl font-black mb-6 tracking-tight">${p.name}</h2>
            <div class="flex items-center space-x-4 mb-8">
                <span class="text-4xl font-black text-gray-900">${formatPrice(p.price)}</span>
                ${p.oldPrice ? `<span class="text-2xl text-gray-300 line-through font-bold">${formatPrice(p.oldPrice)}</span>` : ''}
            </div>
            <div class="prose prose-slate mb-10">
                <p class="text-gray-500 leading-relaxed text-lg">${p.description}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onclick="addToCart(${p.id}); closeProductModal();" class="bg-green-600 text-white font-black py-5 rounded-[1.25rem] hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-xl shadow-green-900/20">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
                <button onclick="buyNowWhatsApp(${p.id})" class="bg-black text-white font-black py-5 rounded-[1.25rem] hover:bg-gray-800 transition flex items-center justify-center gap-3 shadow-xl shadow-black/10">
                    <i class="fa-brands fa-whatsapp text-xl"></i> Comprar Direto
                </button>
            </div>
        </div>
    `;
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.closeProductModal = function() {
    productModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.buyNowWhatsApp = function(id) {
    const p = PRODUCTS.find(x => x.id === id);
    const msg = encodeURIComponent(`Olá AngolaShop! Tenho interesse no produto: *${p.name}* (${formatPrice(p.price)}) que vi no site. Está disponível?`);
    window.open(`https://wa.me/244921225720?text=${msg}`, '_blank');
};

// Cart UI
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

    cartCountLabel.innerText = totalItems;
    cartCountLabel.classList.toggle('hidden', totalItems === 0);
    cartTotalLabel.innerText = formatPrice(totalPrice);
    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMsg.classList.remove('hidden');
    } else {
        emptyCartMsg.classList.add('hidden');
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center space-x-5 border-b border-gray-100 pb-6">
                <img src="${item.images[0]}" class="w-24 h-24 object-cover rounded-2xl border border-gray-50">
                <div class="flex-grow">
                    <h4 class="font-black text-sm line-clamp-1 mb-1">${item.name}</h4>
                    <p class="text-green-600 font-black mb-3">${formatPrice(item.price)}</p>
                    <div class="flex items-center space-x-4">
                        <button onclick="updateQty(${item.id}, -1)" class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition font-black">-</button>
                        <span class="font-black text-base">${item.quantity}</span>
                        <button onclick="updateQty(${item.id}, 1)" class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition font-black">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-gray-300 hover:text-red-500 transition p-2">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }
}

function openCartSidebar() { cartSidebar.classList.remove('translate-x-full'); }
function closeCartSidebar() { cartSidebar.classList.add('translate-x-full'); }

cartBtn.addEventListener('click', openCartSidebar);
closeCart.addEventListener('click', closeCartSidebar);

checkoutBtn.addEventListener('click', () => {
    closeCartSidebar();
    document.getElementById('form-cart-details').value = JSON.stringify(cart.map(i => ({n: i.name, q: i.quantity, p: i.price})));
    checkoutModal.classList.remove('hidden');
});

window.closeCheckout = () => { checkoutModal.classList.add('hidden'); };

whatsappForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-order-btn');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "A processar...";

    const formData = new FormData(whatsappForm);

    // 1. Submit to Netlify Forms via AJAX
    try {
        await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        });
    } catch (error) {
        console.error("Netlify Form submission failed", error);
    }

    // 2. Prepare WhatsApp Message
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;

    let message = `*Novo Pedido - AngolaShop*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*WhatsApp:* ${phone}\n`;
    if(address) message += `*Endereço:* ${address}\n`;
    message += `\n*Produtos:*\n`;

    cart.forEach(item => {
        message += `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n*Total: ${formatPrice(total)}*`;

    const whatsappUrl = `https://wa.me/244921225720?text=${encodeURIComponent(message)}`;

    // 3. Open WhatsApp and Reset
    window.open(whatsappUrl, '_blank');

    cart = [];
    saveCart();
    updateCartUI();
    closeCheckout();

    btn.disabled = false;
    btn.innerText = originalText;

    alert("Pedido registado! O WhatsApp abrirá para confirmar com o vendedor.");
});

init();
