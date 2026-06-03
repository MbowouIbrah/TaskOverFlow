import { Router } from 'express';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/tasks.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getTasks);

// Création réservée aux Managers et Admins
router.post('/', requireRole(['MANAGER', 'SUPER_ADMIN']), createTask);

// Mise à jour : le contrôleur gère la restriction Collaborateur vs Manager
router.patch('/:id', updateTask);
router.put('/:id', updateTask);

// Suppression réservée aux Managers et Admins
router.delete('/:id', requireRole(['MANAGER', 'SUPER_ADMIN']), deleteTask);

export default router;
