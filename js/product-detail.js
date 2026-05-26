document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (productId) {
        loadProductDetail(productId);
    } else {
        window.location.href = 'index.html';
    }
});

async function loadProductDetail(id) {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        const product = products.find(p => p.id === id);

        if (product) {
            document.title = `${product.name} - ${CONFIG.STORE_NAME}`;
            renderProductDetail(product);
        } else {
            document.getElementById('product-detail-container').innerHTML = '<div class="container py-section"><p>Produto não encontrado.</p></div>';
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
    }
}

function renderProductDetail(product) {
    const container = document.getElementById('product-detail-container');

    container.innerHTML = `
        <div class="container py-section">
            <div class="product-detail-grid">
                <div class="product-gallery">
                    <div class="gallery-main">
                        <img src="${product.images[0]}" alt="${product.name}" id="main-img">
                    </div>
                    <div class="gallery-thumbs">
                        ${product.images.map((img, index) => `
                            <img src="${img}" alt="${product.name}" class="${index === 0 ? 'active' : ''}" onclick="changeMainImage(this, '${img}')">
                        `).join('')}
                    </div>
                </div>
                <div class="detail-info">
                    <p class="product-category">${product.category}</p>
                    <h1>${product.name}</h1>
                    <div class="detail-price">
                        <span class="current-price">${product.price.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}</span>
                        ${product.oldPrice ? `<span class="old-price" style="text-decoration: line-through; color: #888; font-size: 18px; margin-left: 10px; font-weight: normal;">${product.oldPrice.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}</span>` : ''}
                    </div>
                    <div class="detail-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                        <button class="btn btn-secondary" style="background-color: #000; color: #fff;" onclick="buyNowWhatsApp(${product.id})">
                            <i class="fa-brands fa-whatsapp"></i> Comprar agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.changeMainImage = function(thumb, src) {
    document.getElementById('main-img').src = src;
    document.querySelectorAll('.gallery-thumbs img').forEach(img => img.classList.remove('active'));
    thumb.classList.add('active');
};

window.buyNowWhatsApp = function(id) {
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id === id);
            if (product) {
                const message = `Olá! Tenho interesse no produto: *${product.name}* (${product.price.toLocaleString('pt-AO')} ${CONFIG.CURRENCY}). Está disponível?`;
                const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
};
