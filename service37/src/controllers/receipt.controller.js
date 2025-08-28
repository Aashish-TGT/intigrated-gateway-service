import { parseQuery } from '../services/nlu.service.js';
import { searchReceipts } from '../services/search.service.js';

export async function search(req, res, next) {
  try {
    const userId = req.user?.userId || 'demo-user';
    const q = (req.query.query || '').toString();
    const { intent, entities } = parseQuery(q);
    if (intent !== 'SEARCH_RECEIPT') {
      return res.status(400).json({ error: 'Only SEARCH_RECEIPT supported on this route' });
    }
    const results = await searchReceipts(userId, entities, q);
    res.json({ query: q, entities, results });
  } catch (e) { next(e); }
}
