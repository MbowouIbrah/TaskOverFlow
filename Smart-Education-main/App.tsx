import React, { useState } from 'react';
import { MemoryRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import News from './pages/News';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import { LanguageProvider } from './contexts/LanguageContext';

const Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <LanguageProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="programs" element={<Programs />} />
            <Route path="news" element={<News />} />
            <Route path="membership" element={<Membership />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </LanguageProvider>
  );
}