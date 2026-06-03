import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // MOT DE PASSE PAR DÉFAUT POUR TOUS : Trigenys2026!
  const hashedPassword = await bcrypt.hash('Trigenys2026!', 10);

  console.log('--- Purge totale de la base ---');
  await prisma.notification.deleteMany();
  await prisma.statusChange.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  console.log('--- 1. Équipe Fondatrice ---');
  const jennifer = await prisma.user.create({
    data: { email: 'lawrynnjennifer@gmail.com', passwordHash: hashedPassword, firstName: 'Jennifer', lastName: 'Trigenys', role: 'SUPER_ADMIN' }
  });
  const ibrah = await prisma.user.create({
    data: { email: 'mbowouibrah@gmail.com', passwordHash: hashedPassword, firstName: 'Ibrah', lastName: 'CTO', role: 'MANAGER' }
  });
  const tiffany = await prisma.user.create({
    data: { email: 'genevetifffen@gmail.com', passwordHash: hashedPassword, firstName: 'Tiffany', lastName: 'Finance', role: 'MANAGER' }
  });
  const agent = await prisma.user.create({
    data: { email: 'commercial@trigenys.com', passwordHash: hashedPassword, firstName: 'Agent', lastName: 'Commercial', role: 'COLLABORATOR' }
  });


  console.log('--- 2. Structure du Portefeuille (8 Projets) ---');
  const p = {
    gov: await prisma.project.create({ data: { id: 'P-GOV', name: 'Gouvernance & Juridique', status: 'URGENT', startDate: new Date('2026-04-30'), endDate: new Date('2026-07-31'), managerId: jennifer.id, createdById: jennifer.id, description: 'Cadrage fondateur et structuration juridique SAS.' } }),
    fin: await prisma.project.create({ data: { id: 'P-FIN', name: 'Finance & Trésorerie', status: 'EN_COURS', startDate: new Date('2026-04-30'), endDate: new Date('2026-12-31'), managerId: tiffany.id, createdById: jennifer.id, description: 'Pilotage budgétaire et objectif 1M FCFA.' } }),
    school: await prisma.project.create({ data: { id: 'P-SCHOOL', name: 'SchoolOS MVP', status: 'EN_COURS', startDate: new Date('2026-05-11'), endDate: new Date('2026-08-31'), managerId: ibrah.id, createdById: jennifer.id, description: 'Produit stratégique pour la rentrée 2026.' } }),
    agen: await prisma.project.create({ data: { id: 'P-AGEN', name: 'AgenStudio Cash Engine', status: 'EN_COURS', startDate: new Date('2026-05-01'), endDate: new Date('2026-12-31'), managerId: ibrah.id, createdById: jennifer.id, description: 'Moteur de cash court terme.' } }),
    com: await prisma.project.create({ data: { id: 'P-COM', name: 'Commercial & Acquisition', status: 'PLANIFIE', startDate: new Date('2026-05-25'), endDate: new Date('2026-12-31'), managerId: jennifer.id, createdById: jennifer.id, description: 'Prospection et acquisition clients.' } }),
    ops: await prisma.project.create({ data: { id: 'P-OPS', name: 'Opérations & Outils', status: 'TERMINE', startDate: new Date('2026-04-30'), endDate: new Date('2026-05-15'), managerId: ibrah.id, createdById: jennifer.id, description: 'Infrastructures internes.' } }),
    conf: await prisma.project.create({ data: { id: 'P-CONF', name: 'Conformité & Sécurité', status: 'PLANIFIE', startDate: new Date('2026-06-01'), endDate: new Date('2026-12-31'), managerId: tiffany.id, createdById: jennifer.id, description: 'Sécurité PI et conformité.' } }),
    launch: await prisma.project.create({ data: { id: 'P-LAUNCH', name: 'Lancement Officiel', status: 'PLANIFIE', startDate: new Date('2026-07-01'), endDate: new Date('2026-07-31'), managerId: jennifer.id, createdById: jennifer.id, description: 'Campagne de lancement Trigenys.' } }),
  };

  console.log('--- 3. Injection Massive des Tâches (Roadmap Intégrale) ---');
  const taskList = [
    // PHASE 0 & 1 : GOUVERNANCE
    { id: 'TG-01', title: 'Réunion fondatrice n°1', priority: 'CRITIQUE', status: 'TERMINE', projectId: 'P-GOV', assigneeId: jennifer.id, deadline: new Date('2026-05-05'), plannedMonths: ['2026-04'] },
    { id: 'TG-02', title: 'Cadrage fondateur Trigenys v1', priority: 'HAUTE', status: 'TERMINE', projectId: 'P-GOV', assigneeId: jennifer.id, deadline: new Date('2026-05-05'), plannedMonths: ['2026-05'] },
    { id: 'TG-03', title: 'Draft Statuts SAS Trigenys', priority: 'HAUTE', status: 'EN_COURS', projectId: 'P-GOV', assigneeId: jennifer.id, deadline: new Date('2026-05-20'), plannedMonths: ['2026-05'] },
    { id: 'TG-04', title: 'Draft Pacte d’associés', priority: 'CRITIQUE', status: 'EN_COURS', projectId: 'P-GOV', assigneeId: jennifer.id, deadline: new Date('2026-05-20'), plannedMonths: ['2026-05'] },
    { id: 'TG-05', title: 'Annexe Vesting & Bad/Good Leaver', priority: 'MOYENNE', status: 'A_FAIRE', projectId: 'P-GOV', assigneeId: jennifer.id, deadline: new Date('2026-05-24'), plannedMonths: ['2026-05'] },
    { id: 'TG-06', title: 'Contrat de cession PI fondateurs', priority: 'HAUTE', status: 'A_FAIRE', projectId: 'P-GOV', assigneeId: jennifer.id, deadline: new Date('2026-06-15'), plannedMonths: ['2026-06'] },

    // FINANCE
    { id: 'TF-01', title: 'Budget de lancement', priority: 'HAUTE', status: 'TERMINE', projectId: 'P-FIN', assigneeId: tiffany.id, deadline: new Date('2026-05-10'), plannedMonths: ['2026-05'] },
    { id: 'TF-02', title: 'Plan de trésorerie mai-octobre', priority: 'CRITIQUE', status: 'EN_COURS', projectId: 'P-FIN', assigneeId: tiffany.id, deadline: new Date('2026-05-20'), plannedMonths: ['2026-05'] },
    { id: 'TF-03', title: 'Politique 60/40 corrigée', priority: 'MOYENNE', status: 'A_FAIRE', projectId: 'P-FIN', assigneeId: tiffany.id, deadline: new Date('2026-05-24'), plannedMonths: ['2026-05'] },
    { id: 'TF-04', title: 'Atteindre 1 000 000 FCFA cash', priority: 'CRITIQUE', status: 'A_FAIRE', projectId: 'P-FIN', assigneeId: tiffany.id, deadline: new Date('2026-06-30'), plannedMonths: ['2026-06'] },

    // SCHOOLOS - SPRINTS
    { id: 'TS-01', title: 'S0: Backlog MVP & User Stories', priority: 'HAUTE', status: 'TERMINE', projectId: 'P-SCHOOL', assigneeId: ibrah.id, deadline: new Date('2026-05-10'), plannedMonths: ['2026-05'] },
    { id: 'TS-02', title: 'S1: Module Auth & Rôles', priority: 'HAUTE', status: 'EN_COURS', projectId: 'P-SCHOOL', assigneeId: ibrah.id, deadline: new Date('2026-05-24'), plannedMonths: ['2026-05'] },
    { id: 'TS-03', title: 'S2: Gestion Élèves & Classes', priority: 'HAUTE', status: 'A_FAIRE', projectId: 'P-SCHOOL', assigneeId: ibrah.id, deadline: new Date('2026-06-07'), plannedMonths: ['2026-06'] },
    { id: 'TS-04', title: 'S3: Module Frais scolaires & Reçus', priority: 'CRITIQUE', status: 'A_FAIRE', projectId: 'P-SCHOOL', assigneeId: ibrah.id, deadline: new Date('2026-06-21'), plannedMonths: ['2026-06'] },
    { id: 'TS-05', title: 'S4: Démo commerciale v0.1', priority: 'HAUTE', status: 'A_FAIRE', projectId: 'P-SCHOOL', assigneeId: ibrah.id, deadline: new Date('2026-07-05'), plannedMonths: ['2026-07'] },

    // AGENSTUDIO - CASH ENGINE
    { id: 'TA-01', title: 'Catalogue 5 offres simples', priority: 'HAUTE', status: 'TERMINE', projectId: 'P-AGEN', assigneeId: ibrah.id, deadline: new Date('2026-05-15'), plannedMonths: ['2026-05'] },
    { id: 'TA-02', title: 'Grille tarifaire & Modèles devis', priority: 'MOYENNE', status: 'TERMINE', projectId: 'P-AGEN', assigneeId: ibrah.id, deadline: new Date('2026-05-15'), plannedMonths: ['2026-05'] },
    { id: 'TA-03', title: 'Message WhatsApp de prospection', priority: 'HAUTE', status: 'EN_COURS', projectId: 'P-AGEN', assigneeId: jennifer.id, deadline: new Date('2026-05-20'), plannedMonths: ['2026-05'] },
    { id: 'TA-04', title: 'Prospection : 100 prospects CRM', priority: 'HAUTE', status: 'A_FAIRE', projectId: 'P-AGEN', assigneeId: agent.id, deadline: new Date('2026-05-31'), plannedMonths: ['2026-05'] },
    { id: 'TA-05', title: 'Closer 1ère mission cash (300k-500k)', priority: 'CRITIQUE', status: 'A_FAIRE', projectId: 'P-AGEN', assigneeId: jennifer.id, deadline: new Date('2026-06-21'), plannedMonths: ['2026-06'] },

    // OUTILS & LANCEMENT
    { id: 'TO-01', title: 'Drive Trigenys structuré', priority: 'MOYENNE', status: 'TERMINE', projectId: 'P-OPS', assigneeId: ibrah.id, deadline: new Date('2026-05-10'), plannedMonths: ['2026-05'] },
    { id: 'TL-01', title: 'Landing Page Trigenys officielle', priority: 'HAUTE', status: 'A_FAIRE', projectId: 'P-LAUNCH', assigneeId: ibrah.id, deadline: new Date('2026-07-10'), plannedMonths: ['2026-07'] },
    { id: 'TL-02', title: 'Kit Commercial complet', priority: 'MOYENNE', status: 'A_FAIRE', projectId: 'P-LAUNCH', assigneeId: jennifer.id, deadline: new Date('2026-07-05'), plannedMonths: ['2026-07'] },
  ];

  for (const t of taskList) {
    await prisma.task.create({
      data: {
        ...t,
        priority: t.priority as any,
        status: t.status as any,
        plannedMonths: t.plannedMonths as any,
        createdById: jennifer.id,
        description: `Livrable stratégique : ${t.title}`
      }
    });
  }

  console.log('--- 4. Milestones ---');
  const milestones = [
    { title: 'Gate 1 : Alignement Fondateur', month: '2026-05', projectId: 'P-GOV', createdById: jennifer.id },
    { title: 'Gate 2 : Socle Structuré', month: '2026-05', projectId: 'P-GOV', createdById: jennifer.id },
    { title: 'Gate 3 : Readiness Lancement', month: '2026-06', projectId: 'P-LAUNCH', createdById: jennifer.id },
    { title: 'Lancement Officiel', month: '2026-07', projectId: 'P-LAUNCH', createdById: jennifer.id },
  ];

  for (const m of milestones) {
    await prisma.milestone.create({ data: m });
  }

  console.log('--- Système Trigenys opérationnel ! ---');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
