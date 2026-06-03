import { Router } from 'express';
import { getMyDashboard } from '../controllers/dashboard.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticateToken, getMyDashboard);

export default router;
