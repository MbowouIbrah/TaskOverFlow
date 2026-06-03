import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import projectsRoutes from './routes/projects.routes';
import tasksRoutes from './routes/tasks.routes';
import dashboardRoutes from './routes/dashboard.routes';
import devRoutes from './routes/dev.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/dev', devRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Une erreur serveur est survenue' });
});

app.listen(PORT, () => {
  console.log(`Serveur TaskFlow démarré sur le port ${PORT}`);
});
