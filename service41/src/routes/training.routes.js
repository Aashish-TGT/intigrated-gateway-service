import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { addPhrase, listPhrases } from '../controllers/training.controller.js';

const r = Router();
r.post('/', auth, addPhrase);
r.get('/', auth, listPhrases);
export default r;
