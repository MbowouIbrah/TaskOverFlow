import React from 'react';
import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';
import { AnchorRail } from './AnchorRail';
import portalConfig from '@/src/portal.access.json';

export function MainLayout() {
  const navItems = [
    { id: 'hero', name: 'Accueil', tagline: 'Retour en haut', icon: 'LayoutGrid', path: '/portail' },
    ...portalConfig.apps
  ];

  return (
    <>
      <Topbar />
      <AnchorRail items={navItems} />
      <Outlet />
    </>
  );
}


