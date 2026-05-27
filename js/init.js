// Global initialization for all pages
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize store branding and links from CONFIG
    if (typeof CONFIG !== 'undefined') {
        // Titles and Text
        document.querySelectorAll('.store-name-text').forEach(el => {
            if (el.tagName === 'A' || el.tagName === 'DIV' || el.classList.contains('logo')) {
                el.innerHTML = CONFIG.STORE_NAME.replace('STORE', '<span>STORE</span>');
            } else {
                el.textContent = CONFIG.STORE_NAME;
            }
        });

        document.querySelectorAll('.whatsapp-display-text').forEach(el => el.textContent = CONFIG.WHATSAPP_DISPLAY);
        document.querySelectorAll('.store-address-text').forEach(el => el.textContent = CONFIG.STORE_ADDRESS);

        // Links
        const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
        document.querySelectorAll('.whatsapp-link').forEach(el => el.href = whatsappUrl);

        const floatBtn = document.getElementById('whatsapp-float');
        if (floatBtn) floatBtn.href = whatsappUrl;

        document.querySelectorAll('.facebook-link').forEach(el => el.href = CONFIG.SOCIAL.FACEBOOK);
        document.querySelectorAll('.instagram-link').forEach(el => el.href = CONFIG.SOCIAL.INSTAGRAM);
    }

    // 2. Page specific logic based on title or presence of elements
    if (document.title.includes('LUANDASTORE - Qualidade') && typeof fetchProducts === 'function') {
        // Home page logic
    }
});
