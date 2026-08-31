import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ArrowRight, Play, Youtube, MapPin, Clock, Star } from 'lucide-react';
import { Page } from '../../types';
import { STATS, PRODUCTS, BLOG_POSTS, WORKSHOPS, TESTIMONIALS } from '../../constants';
import BeforeAfterSlider from '../ui/BeforeAfterSlider';

// ── Scroll reveal hook ──────────────────────────────────────────────────────
const useScrollReveal = (deps: unknown[] = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

// ── Animated counter ────────────────────────────────────────────────────────
const StatCounter: React.FC<{ value: number; suffix: string; label: string; decimal?: boolean }> = ({
  value, suffix, label, decimal
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const duration = 1800;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) { setCount(value); clearInterval(timer); }
          else setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.6 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started, decimal]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif font-light" style={{ fontSize: '3.5rem', lineHeight: 1, color: '#8B1A1A' }}>
        {decimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs tracking-[0.22em] uppercase mt-3" style={{ color: 'rgba(10,10,10,0.45)' }}>
        {label}
      </div>
    </div>
  );
};

// ── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const navigate = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0 }); };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Background */}
      <div className={`hero-bg absolute inset-0 ${loaded ? '' : 'opacity-0'}`}>
        <img
          src="https://picsum.photos/seed/second-time-hero/1920/1080"
          alt="Second Time Studio"
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.75) 100%)' }} />
      </div>

      {/* Animated stitch accent */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ stroke: '#8B1A1A', fill: 'none', strokeWidth: 0.5 }}>
          <circle cx="100" cy="100" r="80" strokeDasharray="4 6" className="animate-spin-slow" />
          <circle cx="100" cy="100" r="55" strokeDasharray="2 8" style={{ animationDirection: 'reverse' }} className="animate-spin-slow" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <p className={`hero-text-1 text-xs tracking-[0.5em] uppercase mb-6 ${loaded ? '' : 'opacity-0'}`}
          style={{ color: '#f0a0a0' }}>
          Auroville, Tamil Nadu · India
        </p>

        <h1 className={`hero-text-2 font-serif font-light leading-none mb-8 ${loaded ? '' : 'opacity-0'}`}
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
          Fashion Deserves<br />
          <em style={{ color: '#f0a0a0' }}>a Second Chance.</em>
        </h1>

        <p className={`hero-text-3 font-light leading-relaxed mx-auto mb-12 ${loaded ? '' : 'opacity-0'}`}
          style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)', color: 'rgba(250,250,250,0.65)', maxWidth: '540px' }}>
          Transforming pre-loved clothing into timeless pieces through creativity, craftsmanship, and conscious design.
        </p>

        <div className={`hero-btn flex flex-col sm:flex-row gap-4 justify-center ${loaded ? '' : 'opacity-0'}`}>
          <button
            onClick={() => navigate('shop')}
            className="px-10 py-4 text-sm tracking-[0.22em] uppercase bg-white text-black transition-all duration-300 hover:bg-red-900 hover:text-white"
          >
            Explore Collection
          </button>
          <button
            onClick={() => navigate('workshops')}
            className="px-10 py-4 text-sm tracking-[0.22em] uppercase text-white border border-white/40 transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Book a Workshop
          </button>
          <button
            className="px-10 py-4 text-sm tracking-[0.22em] uppercase text-white/70 border border-white/20 flex items-center justify-center gap-2 transition-all duration-300 hover:text-white hover:border-white/40"
          >
            <Play size={13} fill="currentColor" />
            Watch Our Story
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35">
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
};

// ── Philosophy Section ───────────────────────────────────────────────────────
const PhilosophySection: React.FC = () => (
  <section className="py-28 px-6" style={{ background: '#fafafa' }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <div className="reveal">
            <span className="brand-line" />
            <h2 className="font-serif font-light mt-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Thoughtfully Designed.<br />
              <em>Carefully Created.</em>
            </h2>
          </div>
          <div className="reveal delay-200 mt-8 space-y-5 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
            <p>
              At Second Time by Arpitha Rai, we believe beauty doesn't always need new materials. Every garment begins its journey as an existing piece of clothing, vintage textile, or forgotten fabric waiting to become something extraordinary.
            </p>
            <p>
              Through thoughtful design and craftsmanship, we create pieces that look entirely new while carrying a lighter footprint on the planet.
            </p>
            <p>
              Every creation is a reminder that fashion can be beautiful, responsible, and meaningful — a reminder that <em className="font-serif text-base" style={{ color: '#8B1A1A' }}>every piece deserves a second life.</em>
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-12 reveal-right">
          {STATS.map((stat, i) => (
            <div key={i} className={`delay-${i * 100}`}>
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} decimal={stat.decimal} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── Featured Collections Section ─────────────────────────────────────────────
const CollectionsSection: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <section className="py-28 px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="reveal">
            <span className="brand-line" />
            <h2 className="font-serif font-light mt-6 text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Featured Collections
            </h2>
          </div>
          <button
            onClick={() => { onNavigate('shop'); window.scrollTo({ top: 0 }); }}
            className="reveal-right flex items-center gap-2 text-xs tracking-[0.22em] uppercase hover-underline transition-colors"
            style={{ color: 'rgba(250,250,250,0.5)' }}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={`product-card aspect-[4/5] reveal delay-${Math.min(i * 100, 400)}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-img w-full h-full object-cover"
              />
              {/* Limited badge */}
              {product.isLimited && (
                <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-[0.15em] uppercase text-white"
                  style={{ background: '#8B1A1A' }}>
                  Only {product.availableCount} left
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-[0.15em] uppercase text-black bg-white">
                  New
                </div>
              )}
              <div className="product-actions">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white font-serif text-xl">{product.name}</p>
                    <p className="text-white/60 text-xs tracking-wider mt-1 capitalize">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">₹{product.price.toLocaleString()}</p>
                    <button
                      onClick={() => { onNavigate('shop'); window.scrollTo({ top: 0 }); }}
                      className="mt-2 px-4 py-2 text-xs tracking-[0.15em] uppercase bg-white text-black hover:bg-red-900 hover:text-white transition-colors"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Transformation Section ──────────────────────────────────────────────────
const TransformationSection: React.FC = () => (
  <section className="py-28 px-6" style={{ background: '#f5f0eb' }}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="reveal flex justify-center">
          <span className="brand-line" />
        </div>
        <h2 className="reveal font-serif font-light mt-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          The Transformation Journey
        </h2>
        <p className="reveal delay-200 mt-4 text-sm" style={{ color: 'rgba(10,10,10,0.5)', maxWidth: '520px', margin: '1rem auto 0' }}>
          From forgotten fabric to wearable art. Drag the slider to witness the metamorphosis.
        </p>
      </div>

      <div className="reveal-scale max-w-3xl mx-auto">
        <BeforeAfterSlider
          beforeImage="https://picsum.photos/seed/before-garment/800/600"
          afterImage="https://picsum.photos/seed/after-creation/800/600"
          beforeLabel="The Original Garment"
          afterLabel="The Transformed Creation"
        />
      </div>

      <div className="reveal text-center mt-10">
        <p className="font-serif italic text-xl" style={{ color: '#8B1A1A' }}>
          "From forgotten fabric to wearable art."
        </p>
      </div>
    </div>
  </section>
);

// ── Meet Arpitha Section ────────────────────────────────────────────────────
const ArpithaSection: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => (
  <section className="py-28 px-6 overflow-hidden" style={{ background: '#fafafa' }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Portrait */}
        <div className="reveal-left relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="https://picsum.photos/seed/arpitha-portrait/700/900"
              alt="Arpitha Rai — Founder of Second Time"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative red accent */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 -z-10" style={{ background: '#8B1A1A', opacity: 0.12 }} />
          <div className="absolute -top-6 -left-6 w-24 h-24 border-2 -z-10" style={{ borderColor: '#8B1A1A', opacity: 0.3 }} />
        </div>

        {/* Text */}
        <div>
          <div className="reveal">
            <span className="brand-line" />
            <p className="text-xs tracking-[0.35em] uppercase mt-6 mb-4" style={{ color: '#8B1A1A' }}>
              The Maker Behind the Studio
            </p>
            <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Meet Arpitha Rai
            </h2>
          </div>
          <div className="reveal delay-200 mt-8 space-y-5 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
            <p>
              Arpitha Rai grew up believing that nothing beautiful should be thrown away. From her grandmother's attic filled with old saris to the overflowing donation bins she noticed in Auroville, she saw opportunity where others saw waste.
            </p>
            <p>
              After years of working in conventional fashion, she chose to walk away from fast cycles and trend-chasing. In Auroville, she found a community that shared her values — and a studio space where Second Time was born.
            </p>
            <p>
              Today, Arpitha and her small team of artisans transform over 800 garments each year, conducting workshops that teach communities to see old clothes as raw material for new creativity.
            </p>
          </div>
          <div className="reveal delay-300 mt-10">
            <button
              onClick={() => { onNavigate('about'); window.scrollTo({ top: 0 }); }}
              className="inline-flex items-center gap-3 text-xs tracking-[0.22em] uppercase hover-underline transition-colors"
              style={{ color: '#8B1A1A' }}
            >
              Read My Story <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Newsletter Section ──────────────────────────────────────────────────────
const NewsletterSection: React.FC<{ onShowNewsletter: () => void }> = ({ onShowNewsletter }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) setSubscribed(true);
  };

  return (
    <section className="py-28 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <img src="https://picsum.photos/seed/newsletter-bg/1200/600" className="w-full h-full object-cover" alt="" />
      </div>
      {/* Decorative stitching */}
      <div className="absolute top-12 right-12 opacity-10">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#8B1A1A" strokeWidth="1">
          <circle cx="60" cy="60" r="50" strokeDasharray="5 8" />
          <circle cx="60" cy="60" r="30" strokeDasharray="3 6" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="reveal flex justify-center">
          <span className="brand-line" />
        </div>
        <h2 className="reveal font-serif font-light mt-6 text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Become Part of the<br /><em style={{ color: '#f0a0a0' }}>Second Time Community</em>
        </h2>
        <p className="reveal delay-200 mt-6 text-sm leading-relaxed" style={{ color: 'rgba(250,250,250,0.5)', marginBottom: '2rem' }}>
          Early access to collections · Sustainability tips · Workshop announcements<br />
          Exclusive stories · Behind-the-scenes content · Special offers
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="reveal delay-300 flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-6 py-4 text-sm outline-none text-white placeholder-white/30 border border-white/15 bg-white/5 focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 text-sm tracking-[0.18em] uppercase text-white font-medium transition-opacity hover:opacity-90"
              style={{ background: '#8B1A1A' }}
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="reveal mt-6 font-serif text-xl text-white">
            Welcome to the community ✦
          </div>
        )}

        <p className="reveal delay-400 mt-8 text-xs" style={{ color: 'rgba(250,250,250,0.25)' }}>
          Or receive our free guide on{' '}
          <button onClick={onShowNewsletter} className="hover-underline" style={{ color: '#f0a0a0' }}>
            creative ways to reuse old clothes →
          </button>
        </p>
      </div>
    </section>
  );
};

// ── Journal Section ──────────────────────────────────────────────────────────
const JournalSection: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-28 px-6" style={{ background: '#fafafa' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="reveal">
            <span className="brand-line" />
            <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Latest from the Journal
            </h2>
          </div>
          <button
            onClick={() => { onNavigate('journal'); window.scrollTo({ top: 0 }); }}
            className="reveal-right flex items-center gap-2 text-xs tracking-[0.22em] uppercase hover-underline"
            style={{ color: 'rgba(10,10,10,0.4)' }}
          >
            All Articles <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className={`reveal delay-${i * 150} group cursor-pointer`}
              onClick={() => { onNavigate('journal'); window.scrollTo({ top: 0 }); }}
            >
              <div className="aspect-[4/3] overflow-hidden mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: '#8B1A1A' }}>
                {post.category.replace('-', ' ')} · {post.readTime}
              </p>
              <h3 className="font-serif font-light text-xl leading-snug mb-3 group-hover:opacity-70 transition-opacity">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'rgba(10,10,10,0.5)' }}>
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs tracking-[0.15em] uppercase hover-underline"
                style={{ color: '#8B1A1A' }}>
                Read More <ArrowRight size={12} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── YouTube Section ──────────────────────────────────────────────────────────
const YouTubeSection: React.FC = () => {
  const videos = [
    { title: 'How to Upcycle Old Shirts', thumb: 'https://picsum.photos/seed/yt-shirts/400/225', duration: '12:34' },
    { title: 'Turning Waste into Wearable Fashion', thumb: 'https://picsum.photos/seed/yt-waste/400/225', duration: '18:05' },
    { title: 'Behind the Scenes at Second Time', thumb: 'https://picsum.photos/seed/yt-bts/400/225', duration: '9:47' },
    { title: 'Kantha Stitch: Beginner Tutorial', thumb: 'https://picsum.photos/seed/yt-kantha/400/225', duration: '22:11' },
  ];

  return (
    <section className="py-28 px-6" style={{ background: '#f5f0eb' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="reveal">
            <span className="brand-line" />
            <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Learn, Create & Transform
            </h2>
            <p className="mt-3 text-sm" style={{ color: 'rgba(10,10,10,0.5)' }}>
              Free tutorials and behind-the-scenes content on our YouTube channel.
            </p>
          </div>
          <a
            href="#"
            className="reveal-right flex items-center gap-2 text-xs tracking-[0.22em] uppercase transition-colors"
            style={{ color: '#8B1A1A' }}
          >
            <Youtube size={16} />
            Subscribe on YouTube
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((video, i) => (
            <div key={i} className={`reveal delay-${i * 100} group cursor-pointer`}>
              <div className="relative aspect-video overflow-hidden mb-4">
                <img src={video.thumb} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={16} fill="#0a0a0a" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5">{video.duration}</div>
              </div>
              <h4 className="text-sm font-medium leading-snug group-hover:opacity-70 transition-opacity">{video.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Testimonials Section ─────────────────────────────────────────────────────
const TestimonialsSection: React.FC = () => (
  <section className="py-28 px-6" style={{ background: '#0a0a0a' }}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="reveal flex justify-center">
          <span className="brand-line" />
        </div>
        <h2 className="reveal font-serif font-light mt-6 text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Stories from Our Community
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.id} className={`reveal delay-${i * 150} p-8`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex gap-0.5 mb-6">
              {Array(5).fill(0).map((_, j) => (
                <Star key={j} size={12} fill="#8B1A1A" style={{ color: '#8B1A1A' }} />
              ))}
            </div>
            <p className="font-serif text-lg leading-relaxed text-white/80 italic mb-8">"{t.text}"</p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm text-white font-medium">{t.name}</p>
                <p className="text-xs mt-0.5 capitalize" style={{ color: 'rgba(250,250,250,0.35)' }}>
                  {t.location} · {t.type}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Visit Studio Section ─────────────────────────────────────────────────────
const StudioSection: React.FC = () => (
  <section className="py-28 px-6" style={{ background: '#fafafa' }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="reveal-left">
          <span className="brand-line" />
          <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Visit Our Studio
          </h2>
          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <MapPin size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#8B1A1A' }} />
              <div>
                <p className="font-medium text-sm mb-1">Second Time by Arpitha Rai</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)' }}>
                  Opposite Tantos Pizzeria<br />
                  Auroville, Tamil Nadu 605101<br />
                  India
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#8B1A1A' }} />
              <div>
                <p className="font-medium text-sm mb-1">Studio Hours</p>
                <div className="text-sm leading-relaxed space-y-1" style={{ color: 'rgba(10,10,10,0.55)' }}>
                  <p>Monday – Saturday: 10:00 AM – 6:00 PM</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-80"
              style={{ background: '#8B1A1A' }}
            >
              Book a Visit
            </button>
            <button
              className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase border transition-colors hover:bg-black hover:text-white"
              style={{ borderColor: '#0a0a0a' }}
            >
              Get Directions
            </button>
          </div>
        </div>

        {/* Studio photo collage */}
        <div className="reveal-right grid grid-cols-2 gap-3">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://picsum.photos/seed/studio-1/400/500" alt="Studio" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="aspect-square overflow-hidden">
              <img src="https://picsum.photos/seed/studio-2/300/300" alt="Studio details" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square overflow-hidden" style={{ background: '#8B1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p className="font-serif italic text-white text-lg leading-tight px-6 text-center">
                "A place where old fabric finds new meaning."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Main HomePage ────────────────────────────────────────────────────────────
interface HomePageProps {
  onNavigate: (page: Page) => void;
  onShowNewsletter: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onShowNewsletter }) => {
  useScrollReveal([]);

  return (
    <div className="page-transition">
      <HeroSection onNavigate={onNavigate} />
      <PhilosophySection />
      <CollectionsSection onNavigate={onNavigate} />
      <TransformationSection />
      <ArpithaSection onNavigate={onNavigate} />
      <NewsletterSection onShowNewsletter={onShowNewsletter} />
      <JournalSection onNavigate={onNavigate} />
      <YouTubeSection />
      <TestimonialsSection />
      <StudioSection />
    </div>
  );
};

export default HomePage;
