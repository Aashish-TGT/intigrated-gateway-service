import { Router } from 'express';
import path from 'path';
import { config } from './config.js';
import { listTemplates, setCurrent, rollback } from './services/templateRegistry.js';
import { generateReceipt } from './controllers/receiptController.js';
import fs from 'fs/promises';

export const router = Router();

// --- Generate a receipt (must come before static) ---
router.post("/receipts/generate", generateReceipt);

// --- Static serve PDFs ---
router.use("/receipts", (req, res, next) => {
  const filePath = path.join(config.paths.receiptsDir, req.path);
  res.sendFile(filePath, err => (err ? next() : null));
});

// --- Template routes ---
router.get('/templates', async (_req, res, next) => {
  try { res.json({ templates: listTemplates() }); } catch (e) { next(e); }
});

router.post('/templates/add', async (req, res, next) => {
  try {
    const { name, version, hbs } = req.body;
    if (!name || !version || !hbs) return res.status(400).json({ error: 'name, version, hbs required' });
    const folder = path.join(config.paths.templatesDir, name);
    await fs.mkdir(folder, { recursive: true });
    const file = path.join(folder, `${version}.hbs`);
    await fs.writeFile(file, hbs, 'utf-8');
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post('/templates/set-current', async (req, res, next) => {
  try {
    const { name, version } = req.body;
    setCurrent(name, version);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post('/templates/rollback', async (req, res, next) => {
  try {
    const { name, toVersion } = req.body;
    rollback(name, toVersion);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
