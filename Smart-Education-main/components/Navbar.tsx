import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, toggleLanguage, language } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-[#111418] dark:text-gray-200 hover:text-primary";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f0f2f4] dark:border-gray-800 bg-white/95 dark:bg-[#111821]/95 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/Logo.png" alt="SMED Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>{t.nav.home}</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about')}`}>{t.nav.about}</Link>
            <Link to="/programs" className={`text-sm font-medium transition-colors ${isActive('/programs')}`}>{t.nav.programs}</Link>
            <Link to="/news" className={`text-sm font-medium transition-colors ${isActive('/news')}`}>{t.nav.news}</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact')}`}>{t.nav.contact}</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center h-9 px-3 text-xs font-bold rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors uppercase"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link to="/membership" className="hidden sm:flex items-center justify-center h-10 px-5 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-blue-600 transition-colors">
              {t.nav.membership}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111821]">
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/')}`}>{t.nav.home}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/about')}`}>{t.nav.about}</Link>
            <Link to="/programs" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/programs')}`}>{t.nav.programs}</Link>
            <Link to="/news" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/news')}`}>{t.nav.news}</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={`text-sm font-medium ${isActive('/contact')}`}>{t.nav.contact}</Link>
            <Link to="/membership" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-primary">{t.nav.membership}</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;