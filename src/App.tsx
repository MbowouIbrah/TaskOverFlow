import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Login from './pages/Login';
import Portal from './pages/Portal';
import ProjectList from './pages/taskflow/ProjectList';
import TaskList from './pages/taskflow/TaskList';
import Roadmap from './pages/taskflow/Roadmap';
import Dashboard from './pages/taskflow/Dashboard';
import Invitations from './pages/dev/Invitations';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';
import { MainLayout } from './components/MainLayout';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const { initialize } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

        
        {/* Protected Routes with Global Layout */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/portail" element={<Portal />} />
          <Route path="/projets" element={<ProjectList />} />
          <Route path="/taches" element={<TaskList />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dev/invitations" element={<Invitations />} />
        </Route>


        <Route path="/" element={<Navigate to="/portail" replace />} />
        <Route path="*" element={<Navigate to="/portail" replace />} />
      </Routes>
      </Router>
    </>
  );
}


