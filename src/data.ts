import { Project, Task } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Refonte Infrastructure Cloud',
    description: 'Migration des services hérités vers une architecture micro-services sur Kubernetes.',
    status: 'En cours',
    manager: 'Sarah Miller',
    team: ['John Doe', 'Alice Wong', 'Bob Smith'],
    category: 'Infrastructure',
    progress: 65,
    startDate: '2026-01-15',
    endDate: '2026-06-30'
  },
  {
    id: 'PRJ-002',
    name: 'Déploiement ERP V3',
    description: 'Mise à jour majeure du système de gestion intégrée pour l\'ensemble des filiales.',
    status: 'Planifié',
    manager: 'Léonard Da Vinci',
    team: ['Charlie Brown', 'Dana Scully'],
    category: 'Business',
    progress: 10,
    startDate: '2026-05-01',
    endDate: '2026-12-15'
  },
  {
    id: 'PRJ-003',
    name: 'Sécurisation des Points d\'Accès',
    description: 'Audit et renforcement de la sécurité périmétrique des bureaux régionaux.',
    status: 'Urgent',
    manager: 'Ellen Ripley',
    team: ['John McClane', 'Sarah Connor'],
    category: 'Sécurité',
    progress: 40,
    startDate: '2026-03-10',
    endDate: '2026-05-20'
  },
  {
    id: 'PRJ-004',
    name: 'Digital Workplace 2026',
    description: 'Modernisation des outils collaboratifs et mise en place du télétravail hybride.',
    status: 'Terminé',
    manager: 'Michael Scott',
    team: ['Pam Beesly', 'Jim Halpert'],
    category: 'Ressources Humaines',
    progress: 100,
    startDate: '2025-09-01',
    endDate: '2026-03-31'
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'TSK-101',
    projectId: 'PRJ-001',
    title: 'Configuration Clusters K8s',
    description: 'Mise en place des environnements de staging et production.',
    status: 'En cours',
    assignee: 'Alice Wong',
    deadline: '2026-04-15',
    priority: 'Haute'
  },
  {
    id: 'TSK-102',
    projectId: 'PRJ-001',
    title: 'Migration Bases de Données',
    description: 'Transfert des données vers les instances gérées.',
    status: 'À faire',
    assignee: 'John Doe',
    deadline: '2026-05-10',
    priority: 'Critique'
  },
  {
    id: 'TSK-201',
    projectId: 'PRJ-002',
    title: 'Formation Administrateurs',
    description: 'Session de formation sur les nouveaux modules financiers.',
    status: 'À faire',
    assignee: 'Charlie Brown',
    deadline: '2026-06-01',
    priority: 'Moyenne'
  },
  {
    id: 'TSK-301',
    projectId: 'PRJ-003',
    title: 'Audit Pare-feu',
    description: 'Analyse des logs et fermeture des ports non utilisés.',
    status: 'En cours',
    assignee: 'John McClane',
    deadline: '2026-04-20',
    priority: 'Haute'
  }
];
