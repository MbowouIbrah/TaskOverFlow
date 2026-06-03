export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  roles: string[];
}

export interface FeatureCategory {
  id: string;
  title: string;
  cards: FeatureCard[];
}

export interface AppDefinition {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  categories: FeatureCategory[];
}

export interface UserSession {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  level: number;
  token: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planifié' | 'En cours' | 'Urgent' | 'Terminé' | 'Suspendu';
  manager: string;
  team: string[];
  category: string;
  progress: number;
  startDate: string;
  endDate: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'À faire' | 'En cours' | 'Bloqué' | 'Terminé';
  assignee: string;
  deadline: string;
  priority: 'Basse' | 'Moyenne' | 'Haute' | 'Critique';
}
