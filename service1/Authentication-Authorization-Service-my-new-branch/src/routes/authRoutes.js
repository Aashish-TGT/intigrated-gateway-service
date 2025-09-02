import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as AuthCtrl from '../controllers/authController.js';

const router = Router();

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/refresh', AuthCtrl.refresh);
router.post('/logout', authenticate, AuthCtrl.logout);
router.get('/me', authenticate, AuthCtrl.me);

export default router;
