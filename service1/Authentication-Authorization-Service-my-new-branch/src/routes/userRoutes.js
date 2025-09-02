import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireAnyRole } from '../middleware/requireRole.js';
import { ROLES } from '../config/roles.js';
import * as UserCtrl from '../controllers/userController.js';

const router = Router();

router.use(authenticate);

router.get('/', requireAnyRole(ROLES.BUSINESS_ADMIN, ROLES.SUPER_ADMIN), UserCtrl.list);
router.patch('/:id/role', requireAnyRole(ROLES.SUPER_ADMIN), UserCtrl.updateRole);

export default router;
