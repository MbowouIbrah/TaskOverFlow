import { Router } from 'express';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projects.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';

const router = Router();

// Toutes les routes de projets nécessitent d'être authentifié
router.use(authenticateToken);

router.get('/', getProjects);
router.get('/:id', getProjectById);

// Seuls les Managers et Super Admins peuvent créer ou modifier des projets
router.post('/', requireRole(['MANAGER', 'SUPER_ADMIN']), createProject);
router.put('/:id', requireRole(['MANAGER', 'SUPER_ADMIN']), updateProject);

// Seuls les Super Admins peuvent supprimer des projets
router.delete('/:id', requireRole(['SUPER_ADMIN']), deleteProject);

export default router;
