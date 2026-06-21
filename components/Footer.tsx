import React, { useState } from 'react';
import { Instagram, Youtube, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navigate = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#0a0a0a', color: '#fafafa' }}>
      {/* Marquee ticker */}
      <div className="overflow-hidden border-t border-b py-4" style={{ borderColor: '#8B1A1A' }}>
        <div className="marquee-track">
          {Array(6).fill(['Sustainable Fashion', '·', 'Auroville Studio', '·', 'Upcycled Garments', '·', 'Slow Fashion', '·', 'Circular Design', '·', 'Conscious Living', '·']).flat().map((item, i) => (
            <span key={i} className="px-4 text-xs tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: i % 2 === 1 ? '#8B1A1A' : '#fafafa' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="font-serif font-light tracking-[0.22em] uppercase text-2xl">Second Time</h2>
              <p className="text-xs tracking-[0.35em] uppercase mt-1" style={{ color: '#8B1A1A' }}>by Arpitha Rai</p>
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(250,250,250,0.5)' }}>
              Fashion deserves a second chance. Transforming pre-loved garments into timeless pieces through creativity, craftsmanship, and conscious design. Auroville, Tamil Nadu.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(250,250,250,0.4)' }}>
                Join our community
              </p>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-0 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-4 py-3 text-sm outline-none bg-transparent border border-white/20 focus:border-white/50 transition-colors text-white placeholder-white/30"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 text-white transition-opacity hover:opacity-80"
                    style={{ background: '#8B1A1A' }}
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <p className="text-sm" style={{ color: '#f0a0a0' }}>Welcome to the community ✦</p>
              )}
            </div>

            {/* Social */}
            <div className="flex gap-5 mt-8">
              <a href="#" className="transition-opacity hover:opacity-60" style={{ color: 'rgba(250,250,250,0.6)' }}>
                <Instagram size={18} />
              </a>
              <a href="#" className="transition-opacity hover:opacity-60" style={{ color: 'rgba(250,250,250,0.6)' }}>
                <Youtube size={18} />
              </a>
              <a href="#" className="transition-opacity hover:opacity-60" style={{ color: 'rgba(250,250,250,0.6)' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(250,250,250,0.4)' }}>
              Explore
            </h3>
            <nav className="space-y-4">
              {[
                { label: 'Shop Collection', page: 'shop' as Page },
                { label: 'Workshops', page: 'workshops' as Page },
                { label: 'Journal', page: 'journal' as Page },
                { label: 'About Arpitha', page: 'about' as Page },
                { label: 'Custom Design', page: 'custom' as Page },
              ].map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className="block text-sm hover-underline transition-colors hover:text-white"
                  style={{ color: 'rgba(250,250,250,0.5)' }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Studio info */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(250,250,250,0.4)' }}>
              Visit the Studio
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#8B1A1A' }} />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,250,250,0.5)' }}>
                  Opposite Tantos Pizzeria<br />
                  Auroville, Tamil Nadu<br />
                  India — 605101
                </p>
              </div>
              <div className="space-y-1.5 pl-0">
                <p className="text-xs" style={{ color: 'rgba(250,250,250,0.35)' }}>Monday – Saturday</p>
                <p className="text-sm" style={{ color: 'rgba(250,250,250,0.6)' }}>10:00 AM – 6:00 PM</p>
                <p className="text-xs mt-2" style={{ color: 'rgba(250,250,250,0.35)' }}>Sunday</p>
                <p className="text-sm" style={{ color: 'rgba(250,250,250,0.6)' }}>By Appointment</p>
              </div>
              <button
                onClick={() => navigate('about')}
                className="mt-4 text-xs tracking-[0.2em] uppercase hover-underline"
                style={{ color: '#f0a0a0' }}
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(250,250,250,0.3)' }}>
            © 2026 Second Time by Arpitha Rai. All rights reserved.
          </p>
          <p className="text-xs font-serif italic" style={{ color: 'rgba(250,250,250,0.2)' }}>
            Giving Fabrics a Second Life. Creating Stories Worth Wearing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
