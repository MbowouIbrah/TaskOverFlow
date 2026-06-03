import { Router } from 'express';
import { getMe, getAllUsers } from '../controllers/users.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticateToken, getMe);
router.get('/', authenticateToken, getAllUsers);

export default router;

