import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../../constants';
import { BlogPost } from '../../types';

const BRAND_RED = '#8B1A1A';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Sustainability', value: 'sustainability' },
  { label: 'Fashion Stories', value: 'fashion-stories' },
  { label: 'DIY Tutorials', value: 'diy' },
  { label: 'Studio Diary', value: 'studio-diary' },
  { label: 'Inspiration', value: 'inspiration' },
];

const CATEGORY_LABELS: Record<string, string> = {
  'sustainability': 'Sustainability',
  'fashion-stories': 'Fashion Stories',
  'diy': 'DIY Tutorial',
  'studio-diary': 'Studio Diary',
  'inspiration': 'Inspiration',
};

const ArticleModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-overlay items-start overflow-y-auto py-8" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white max-w-3xl w-full mx-4 my-auto">
        <div className="aspect-[16/7] overflow-hidden relative">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-10">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: BRAND_RED }}>
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="text-xs" style={{ color: 'rgba(10,10,10,0.35)' }}>·</span>
            <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(10,10,10,0.4)' }}>
              <Clock size={11} />{post.readTime}
            </span>
            <span className="text-xs" style={{ color: 'rgba(10,10,10,0.35)' }}>·</span>
            <span className="text-xs" style={{ color: 'rgba(10,10,10,0.4)' }}>{post.date}</span>
          </div>
          <h1 className="font-serif font-light text-3xl leading-snug mb-6">{post.title}</h1>
          <div className="prose prose-sm max-w-none">
            <p className="text-base leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>{post.excerpt}</p>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)' }}>
              In the world of conscious fashion, this is more than a principle — it is a practice. At Second Time, every choice made in the studio stems from this conviction. From the selection of fabrics to the techniques we teach in our workshops, everything reflects a belief that beauty and responsibility are not opposites.
            </p>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)' }}>
              We invite you to explore this further — to sit with the questions that arise when we examine how we consume, what we value, and what stories we choose to tell through the clothes we wear.
            </p>
            <blockquote className="border-l-2 pl-6 my-8 font-serif text-xl italic" style={{ borderColor: BRAND_RED, color: BRAND_RED }}>
              "Fashion is a language. Choose your words wisely."
            </blockquote>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)' }}>
              The full article is available in our print journal, distributed at the studio every month. Subscribe to our newsletter to be notified when new pieces are published.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const JournalPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useScrollReveal();

  const featured = BLOG_POSTS.filter(p => p.featured);
  const filtered = BLOG_POSTS.filter(p =>
    activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="pt-28 pb-20 px-6 text-center" style={{ background: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.45em] uppercase mb-5" style={{ color: '#f0a0a0' }}>
            The Journal
          </p>
          <h1 className="font-serif font-light text-white mb-5" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Stories Worth<br /><em>Reading.</em>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,250,250,0.5)', maxWidth: '440px', margin: '0 auto' }}>
            Essays, tutorials, studio diaries, and reflections on sustainability, craft, and the beauty of second chances.
          </p>
        </div>
      </div>

      {/* Featured articles */}
      {featured.length > 0 && (
        <div className="py-20 px-6" style={{ background: '#fafafa' }}>
          <div className="max-w-7xl mx-auto">
            <div className="reveal mb-10">
              <span className="brand-line" />
              <p className="text-xs tracking-[0.3em] uppercase mt-4" style={{ color: 'rgba(10,10,10,0.4)' }}>Featured</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">
              {/* Large featured */}
              <div
                className="lg:col-span-3 group cursor-pointer reveal"
                onClick={() => setSelectedPost(featured[0])}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={featured[0].image} alt={featured[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-xs tracking-[0.2em] uppercase text-white/70 mb-3 block">
                      {CATEGORY_LABELS[featured[0].category]}
                    </span>
                    <h2 className="font-serif font-light text-white text-2xl leading-snug">{featured[0].title}</h2>
                  </div>
                </div>
              </div>

              {/* Secondary featured */}
              {featured[1] && (
                <div
                  className="lg:col-span-2 group cursor-pointer reveal delay-200"
                  onClick={() => setSelectedPost(featured[1])}
                >
                  <div className="h-full aspect-[16/10] lg:aspect-auto overflow-hidden relative" style={{ minHeight: '280px' }}>
                    <img src={featured[1].image} alt={featured[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-xs tracking-[0.2em] uppercase text-white/70 mb-2 block">
                        {CATEGORY_LABELS[featured[1].category]}
                      </span>
                      <h2 className="font-serif font-light text-white text-xl leading-snug">{featured[1].title}</h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-black/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className="px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all"
              style={{
                background: activeCategory === value ? '#0a0a0a' : 'transparent',
                color: activeCategory === value ? '#fafafa' : 'rgba(10,10,10,0.5)',
                border: `1px solid ${activeCategory === value ? '#0a0a0a' : 'rgba(10,10,10,0.12)'}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* All articles */}
      <div className="py-20 px-6" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filtered.map((post, i) => (
              <article
                key={post.id}
                className={`reveal delay-${Math.min(i * 100, 400)} group cursor-pointer`}
                onClick={() => setSelectedPost(post)}
              >
                <div className="aspect-[4/3] overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs tracking-[0.18em] uppercase" style={{ color: BRAND_RED }}>
                    {CATEGORY_LABELS[post.category]}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(10,10,10,0.3)' }}>·</span>
                  <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(10,10,10,0.4)' }}>
                    <Clock size={10} />{post.readTime}
                  </span>
                </div>
                <h3 className="font-serif font-light text-xl leading-snug mb-3 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: 'rgba(10,10,10,0.5)' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'rgba(10,10,10,0.35)' }}>{post.date}</span>
                  <span className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase hover-underline" style={{ color: BRAND_RED }}>
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="py-20 px-6" style={{ background: '#f5f0eb' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal flex justify-center"><span className="brand-line" /></div>
          <h2 className="reveal font-serif font-light mt-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            Never miss a story.
          </h2>
          <p className="reveal delay-200 text-sm mt-4 mb-8" style={{ color: 'rgba(10,10,10,0.5)' }}>
            Subscribe to the Second Time newsletter for new essays, tutorials, and studio updates.
          </p>
          <form className="reveal delay-300 flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
            onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-5 py-4 text-sm border border-black/15 outline-none focus:border-black transition-colors bg-transparent"
            />
            <button
              type="submit"
              className="px-8 py-4 text-xs tracking-[0.2em] uppercase text-white"
              style={{ background: BRAND_RED }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {selectedPost && <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default JournalPage;
