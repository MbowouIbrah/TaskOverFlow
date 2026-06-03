import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, initialize } = useAuthStore();
  const location = useLocation();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    initialize();
    setIsInitializing(false);
  }, [initialize]);

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/portail" replace />;
  }

  return <>{children}</>;
}
