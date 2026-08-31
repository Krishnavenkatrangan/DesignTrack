import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount?: number;
  isDark?: boolean;
}

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: 'Shop', page: 'shop' },
  { label: 'Workshops', page: 'workshops' },
  { label: 'Journal', page: 'journal' },
  { label: 'About', page: 'about' },
  { label: 'Custom Design', page: 'custom' },
];

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, cartCount = 0, isDark = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => { setMobileOpen(false); }, [currentPage]);

  const navigate = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  const isLight = scrolled || !isDark;
  const textColor = isLight ? '#0a0a0a' : '#fafafa';
  const accentColor = isLight ? '#8B1A1A' : '#f0a0a0';
  const bgStyle = scrolled
    ? { background: 'rgba(250,250,250,0.93)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }
    : { background: 'transparent' };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ ...bgStyle, paddingTop: scrolled ? '14px' : '24px', paddingBottom: scrolled ? '14px' : '24px' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex flex-col leading-none text-left"
          >
            <span
              className="font-serif tracking-[0.22em] uppercase transition-colors duration-300"
              style={{ fontSize: '15px', color: textColor, fontWeight: 300 }}
            >
              Second Time
            </span>
            <span
              className="text-xs tracking-[0.35em] uppercase transition-colors duration-300"
              style={{ color: accentColor, marginTop: '2px', fontSize: '9px' }}
            >
              by Arpitha Rai
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className="hover-underline text-xs tracking-[0.18em] uppercase transition-colors duration-300"
                style={{
                  color: currentPage === page ? '#8B1A1A' : textColor,
                  fontWeight: currentPage === page ? 500 : 400,
                  opacity: currentPage === page ? 1 : isLight ? 0.75 : 0.8,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              className="relative p-1 transition-colors duration-300"
              style={{ color: textColor }}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center"
                  style={{ background: '#8B1A1A' }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('workshops')}
              className="px-5 py-2.5 text-xs tracking-[0.18em] uppercase border transition-all duration-300 hover:text-white"
              style={{
                borderColor: isLight ? '#0a0a0a' : '#fafafa',
                color: isLight ? '#0a0a0a' : '#fafafa',
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.background = '#8B1A1A';
                (e.target as HTMLButtonElement).style.borderColor = '#8B1A1A';
                (e.target as HTMLButtonElement).style.color = 'white';
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.background = 'transparent';
                (e.target as HTMLButtonElement).style.borderColor = isLight ? '#0a0a0a' : '#fafafa';
                (e.target as HTMLButtonElement).style.color = isLight ? '#0a0a0a' : '#fafafa';
              }}
            >
              Book Workshop
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 transition-colors duration-300"
            style={{ color: textColor }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-between"
          style={{ background: '#0a0a0a', paddingTop: '80px' }}
        >
          <div className="px-8 py-12">
            <nav className="space-y-6">
              {[{ label: 'Home', page: 'home' as Page }, ...NAV_LINKS].map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className="block w-full text-left font-serif font-light transition-colors"
                  style={{
                    fontSize: '2.5rem',
                    lineHeight: 1.1,
                    color: currentPage === page ? '#f0a0a0' : '#fafafa',
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="mt-12 pt-8 border-t border-white/10">
              <button
                onClick={() => navigate('workshops')}
                className="w-full py-4 text-sm tracking-[0.2em] uppercase text-white border border-white/20 hover:border-red-800 transition-colors"
              >
                Book a Workshop
              </button>
            </div>
          </div>
          <div className="px-8 py-8 border-t border-white/10">
            <p className="text-xs text-white/30 tracking-[0.2em] uppercase">Second Time by Arpitha Rai</p>
            <p className="text-xs text-white/20 mt-1">Auroville, Tamil Nadu</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
