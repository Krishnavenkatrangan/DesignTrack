import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import NewsletterModal from './components/ui/NewsletterModal';
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import WorkshopsPage from './components/pages/WorkshopsPage';
import JournalPage from './components/pages/JournalPage';
import AboutPage from './components/pages/AboutPage';
import CustomDesignPage from './components/pages/CustomDesignPage';

const DARK_HERO_PAGES: Page[] = ['home', 'about'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Newsletter popup after 8s on first session visit
  useEffect(() => {
    const seen = sessionStorage.getItem('st-newsletter-shown');
    if (!seen) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
        sessionStorage.setItem('st-newsletter-shown', '1');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const isDarkPage = DARK_HERO_PAGES.includes(currentPage);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navigation
        currentPage={currentPage}
        onNavigate={navigate}
        isDark={isDarkPage}
      />

      <main>
        {currentPage === 'home' && (
          <HomePage onNavigate={navigate} onShowNewsletter={() => setShowNewsletter(true)} />
        )}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'workshops' && <WorkshopsPage />}
        {currentPage === 'journal' && <JournalPage />}
        {currentPage === 'about' && <AboutPage onNavigate={navigate} />}
        {currentPage === 'custom' && <CustomDesignPage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />

      {showNewsletter && <NewsletterModal onClose={() => setShowNewsletter(false)} />}
    </div>
  );
};

export default App;
