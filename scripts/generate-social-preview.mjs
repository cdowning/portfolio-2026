import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const source = resolve(scriptsDirectory, 'social-preview.html')
const output = resolve(scriptsDirectory, '../public/images/social-preview.png')

await mkdir(dirname(output), { recursive: true })

const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto(pathToFileURL(source).href)
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.social-card').screenshot({ path: output })
} finally {
  await browser.close()
}
