import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def verify_store():
    # Start a simple local server
    server_process = subprocess.Popen(['python3', '-m', 'http.server', '8080'])
    time.sleep(2)  # Wait for server to start

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            # 1. Home Page & Catalog
            print("Verificando Home Page...")
            await page.goto("http://localhost:8080/index.html")
            await page.wait_for_selector(".product-grid")
            await page.screenshot(path="verify_home.png")

            # Check for featured sections
            novidades = await page.query_selector_all(".py-section h2")
            titles = [await n.inner_text() for n in novidades]
            print(f"Secções encontradas: {titles}")

            # 2. Filtering
            print("Verificando Filtros...")
            await page.fill("#search-input", "iPhone")
            await page.wait_for_timeout(500)
            await page.screenshot(path="verify_filter_search.png")

            # 3. Product Detail
            print("Verificando Detalhes do Produto...")
            await page.goto("http://localhost:8080/product.html?id=1")
            await page.wait_for_selector(".product-detail-grid")
            await page.screenshot(path="verify_product_detail.png")

            # 4. Cart
            print("Verificando Carrinho...")
            await page.click("button.btn-primary") # Add to cart
            await page.goto("http://localhost:8080/cart.html")
            await page.wait_for_selector(".cart-item")
            await page.screenshot(path="verify_cart.png")

            print("Verificação concluída com sucesso!")

        except Exception as e:
            print(f"Erro durante a verificação: {e}")
        finally:
            await browser.close()
            server_process.terminate()

if __name__ == "__main__":
    asyncio.run(verify_store())
