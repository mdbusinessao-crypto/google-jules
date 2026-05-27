let products = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupFilters();
});

async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();

        renderFeaturedProducts();
        renderProducts(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        const grid = document.getElementById('product-grid');
        if (grid) grid.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}

function renderFeaturedProducts() {
    const newArrivalsGrid = document.getElementById('new-arrivals-grid');
    const bestSellersGrid = document.getElementById('best-sellers-grid');

    if (newArrivalsGrid) {
        const news = products.filter(p => p.tag === 'Novidade' || p.tag === 'Novo');
        newArrivalsGrid.innerHTML = news.slice(0, 4).map(product => generateProductHTML(product)).join('');
    }

    if (bestSellersGrid) {
        const best = products.filter(p => p.isBestSeller);
        bestSellersGrid.innerHTML = best.slice(0, 4).map(product => generateProductHTML(product)).join('');
    }
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    if (productsToRender.length === 0) {
        grid.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }

    grid.innerHTML = productsToRender.map(product => generateProductHTML(product)).join('');
}

function generateProductHTML(product) {
    return `
        <div class="product-card">
            ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
            <div class="product-img">
                <a href="product.html?id=${product.id}">
                    <img src="${product.images[0]}" alt="${product.name}">
                </a>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <a href="product.html?id=${product.id}"><h3 class="product-name">${product.name}</h3></a>
                <div class="product-price-row">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                <button class="btn btn-primary btn-full" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
}

function formatPrice(price) {
    return price.toLocaleString('pt-AO') + ' ' + CONFIG.CURRENCY;
}

function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const priceSelect = document.getElementById('price-select');

    const filterAll = () => {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categorySelect ? categorySelect.value : 'all';
        const priceRange = priceSelect ? priceSelect.value : 'all';

        let filtered = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || p.category === category;

            let matchesPrice = true;
            if (priceRange !== 'all') {
                if (priceRange === '500000+') {
                    matchesPrice = p.price >= 500000;
                } else {
                    const [min, max] = priceRange.split('-').map(Number);
                    matchesPrice = p.price >= min && p.price <= max;
                }
            }

            return matchesSearch && matchesCategory && matchesPrice;
        });

        renderProducts(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', filterAll);
    if (categorySelect) categorySelect.addEventListener('change', filterAll);
    if (priceSelect) priceSelect.addEventListener('change', filterAll);
}

window.filterByCategory = function(category) {
    const categorySelect = document.getElementById('category-select');
    const catalogSection = document.getElementById('produtos');

    if (categorySelect) {
        categorySelect.value = category;
        const event = new Event('change');
        categorySelect.dispatchEvent(event);
    } else {
        // Fallback for home page category cards if selector not present or not loaded
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }

    if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
};
