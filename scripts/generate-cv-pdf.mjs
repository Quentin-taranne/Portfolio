// Génère les PDF du CV (FR et EN) à partir de la page /cv du site.
// Usage : npm run build && npm run cv:pdf
// Les fichiers sont écrits dans public/cv/ ; le script échoue si un CV dépasse une page.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const PORT = 4310;
const BASE = `http://localhost:${PORT}`;
const OUT = "public/cv";
const FILES = [
  { path: "/cv", file: "CV-Quentin-Taranne-Payet-FR.pdf" },
  { path: "/en/cv", file: "CV-Quentin-Taranne-Payet-EN.pdf" },
];

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
const stop = () => server.kill();

try {
  // Attend que le serveur réponde.
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(`${BASE}/cv`)).ok) break;
    } catch {}
    if (i > 60) throw new Error("Le serveur ne répond pas : lancer `npm run build` d'abord.");
    await new Promise((r) => setTimeout(r, 500));
  }

  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const { path, file } of FILES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
    const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
    if (pages !== 1) throw new Error(`${file} fait ${pages} pages : le CV doit tenir sur une seule.`);
    await writeFile(`${OUT}/${file}`, pdf);
    console.log(`✓ ${OUT}/${file} (1 page, ${Math.round(pdf.length / 1024)} Ko)`);
  }
  await browser.close();
} catch (e) {
  console.error("✗", e.message);
  process.exitCode = 1;
} finally {
  stop();
}

