import TrainingPhrase from '../models/TrainingPhrase.js';

export async function addPhrase(req, res, next) {
  try {
    const userId = req.user?.userId || 'demo-user';
    const { phrase, intent, hints } = req.body;
    if (!phrase || !intent) return res.status(400).json({ error: 'phrase & intent required' });
    const tp = await TrainingPhrase.create({ userId, phrase, intent, hints });
    res.status(201).json(tp);
  } catch (e) { next(e); }
}

export async function listPhrases(req, res, next) {
  try {
    const userId = req.user?.userId || 'demo-user';
    const list = await TrainingPhrase.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (e) { next(e); }
}
