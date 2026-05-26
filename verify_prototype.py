import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Obter o caminho absoluto do arquivo prototype.html
        path = os.path.abspath("prototype.html")
        url = f"file://{path}"

        # Desktop version
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto(url)
        await page.screenshot(path="desktop_prototype.png", full_page=True)
        print("Desktop screenshot saved.")

        # Mobile version (iPhone 12/13)
        await page.set_viewport_size({"width": 390, "height": 844})
        await page.goto(url)
        await page.screenshot(path="mobile_prototype.png", full_page=True)
        print("Mobile screenshot saved.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
