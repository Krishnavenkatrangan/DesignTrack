import React, { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

interface NewsletterModalProps {
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative bg-white max-w-2xl w-full mx-4 flex overflow-hidden" style={{ maxHeight: '90vh' }}>
        {/* Left panel — decorative image */}
        <div className="hidden md:block w-2/5 relative">
          <img
            src="https://picsum.photos/seed/newsletter-modal/400/600"
            alt="Second Time Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <p className="font-serif italic text-2xl leading-tight">"Every piece deserves<br/>a second life."</p>
            <p className="text-xs tracking-[0.2em] uppercase mt-3 opacity-70">— Arpitha Rai</p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 p-10 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-black/40 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>

          {!submitted ? (
            <>
              <div className="brand-line mb-6" />
              <h2 className="font-serif font-light text-3xl leading-tight mb-3">
                Give Your Wardrobe<br/>a Second Life.
              </h2>
              <p className="text-sm text-black/60 leading-relaxed mb-2">
                Join the Second Time community and receive a free guide:
              </p>
              <p className="text-sm font-medium text-red-900 mb-6">
                "10 Creative Ways to Reuse Old Clothes"
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder-black/30"
                />
                <input
                  type="email"
                  placeholder="Your email address *"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  required
                  className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder-black/30"
                />
                {error && <p className="text-xs text-red-700">{error}</p>}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 text-sm tracking-[0.2em] uppercase text-white font-medium transition-all hover:opacity-90"
                    style={{ background: '#8B1A1A' }}
                  >
                    Join the Movement
                  </button>
                </div>
              </form>

              <div className="mt-6 space-y-2">
                {[
                  'Early access to new collections',
                  'Sustainability tips & tutorials',
                  'Workshop announcements',
                  'Behind-the-scenes stories',
                ].map(benefit => (
                  <div key={benefit} className="flex items-center gap-2 text-xs text-black/60">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#8B1A1A' }} />
                    {benefit}
                  </div>
                ))}
              </div>

              <p className="text-xs text-black/30 mt-6">
                No spam, ever. Unsubscribe any time.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-64 text-center">
              <CheckCircle size={48} className="mb-6" style={{ color: '#8B1A1A' }} />
              <h3 className="font-serif font-light text-3xl mb-3">Welcome, {name || 'friend'}.</h3>
              <p className="text-sm text-black/60 leading-relaxed mb-6">
                Your free guide is on its way. Check your inbox for
                <strong> "10 Creative Ways to Reuse Old Clothes."</strong>
              </p>
              <button
                onClick={onClose}
                className="text-xs tracking-[0.2em] uppercase hover-underline"
                style={{ color: '#8B1A1A' }}
              >
                Continue Exploring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
