import React, { useEffect } from 'react';
import { ArrowRight, Leaf, Scissors, Heart, Globe } from 'lucide-react';
import { Page } from '../../types';

const BRAND_RED = '#8B1A1A';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const TIMELINE = [
  {
    year: '1988',
    title: 'A Childhood of Making',
    desc: 'Born in Mysore, Arpitha grew up surrounded by her grandmother\'s sari collections and a mother who never threw anything away. From age seven, she was already transforming fabric scraps into doll clothes and embroidered tea towels.',
  },
  {
    year: '2008',
    title: 'Into the Fashion World',
    desc: 'After graduating in textile design from NIFT Bangalore, Arpitha joined a Chennai export house. She rose quickly — but grew increasingly troubled by the mountains of waste she witnessed daily on the factory floor.',
  },
  {
    year: '2014',
    title: 'The Breaking Point',
    desc: 'A trip to a textile dumpsite outside Chennai changed everything. Watching tonnes of fabric — some barely used — being buried, Arpitha made a decision: she would find a different way to create fashion.',
  },
  {
    year: '2016',
    title: 'Arriving in Auroville',
    desc: 'Drawn by its philosophy of sustainable living and conscious community, Arpitha moved to Auroville with two suitcases and a dream. Within months, she had set up a small workshop space and was holding her first upcycling class.',
  },
  {
    year: '2017',
    title: 'Second Time is Born',
    desc: 'The studio officially opened opposite Tantos Pizzeria. The first collection — six pieces — sold out in a single afternoon. Word spread through the Auroville community, and beyond.',
  },
  {
    year: 'Today',
    title: 'Growing a Movement',
    desc: 'Today, Second Time employs four artisans, has conducted over 120 workshops, and has diverted more than 1.2 tonnes of textile waste from landfill. The mission remains unchanged: every piece deserves a second life.',
  },
];

const VALUES = [
  {
    icon: Leaf,
    title: 'Circular by Design',
    desc: 'Nothing is waste until we decide it is. Every creation starts with what already exists — pre-loved garments, surplus fabric, vintage textiles.',
  },
  {
    icon: Scissors,
    title: 'Craft Above All',
    desc: 'We are makers first. Every stitch, cut, and embellishment is done by hand. Slowness is a feature, not a bug.',
  },
  {
    icon: Heart,
    title: 'Community at the Core',
    desc: 'The studio exists to share knowledge, not just sell products. Our workshops are as important as our collections.',
  },
  {
    icon: Globe,
    title: 'Local, Always',
    desc: 'All materials are sourced within 200km. All artisans are Auroville and Tamil Nadu residents. We believe in the power of proximity.',
  },
];

const AboutPage: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => {
  useScrollReveal();

  const navigate = (page: Page) => { onNavigate(page); window.scrollTo({ top: 0 }); };

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="relative h-screen flex items-end pb-16 overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/about-hero/1400/900" alt="Arpitha Rai in the studio" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-5" style={{ color: '#f0a0a0' }}>The Story</p>
          <h1 className="font-serif font-light text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', maxWidth: '700px', lineHeight: 1.05 }}>
            Arpitha Rai &<br /><em>Second Time.</em>
          </h1>
        </div>
      </div>

      {/* Opening statement */}
      <div className="py-24 px-6" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src="https://picsum.photos/seed/arpitha-studio/600/750" alt="Arpitha at work" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-5 px-6 py-4 text-white text-sm font-serif italic" style={{ background: BRAND_RED }}>
              "Every piece deserves<br/>a second life."
            </div>
          </div>
          <div>
            <div className="reveal">
              <span className="brand-line" />
              <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Why Second Time Exists
              </h2>
            </div>
            <div className="reveal delay-200 mt-8 space-y-5 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
              <p>
                The global fashion industry generates 92 million tonnes of textile waste every year. Most of it is never seen. It is buried, burned, or shipped abroad. Arpitha Rai saw this waste not as a problem to manage, but as material to transform.
              </p>
              <p>
                Second Time exists at the intersection of craft, sustainability, and community. It is not just a studio — it is a counter-argument to the logic of disposability that has overtaken fashion.
              </p>
              <p>
                When Arpitha picks up a discarded garment, she does not see a problem. She sees possibility. A kantha stitch waiting to be revived. A silk scarf that could become a blouse. A pair of curtains that might become the most extraordinary dress someone has ever owned.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 px-6" style={{ background: '#f5f0eb' }}>
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="brand-line mx-auto block" />
            <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              A Journey in Chapters
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'rgba(139,26,26,0.2)' }} />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`reveal delay-${Math.min(i * 100, 400)} flex gap-10`}>
                  {/* Year bubble */}
                  <div className="flex-shrink-0 w-16 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full border-2 mt-1" style={{ borderColor: BRAND_RED, background: i === TIMELINE.length - 1 ? BRAND_RED : '#f5f0eb' }} />
                    <span className="text-xs tracking-wider mt-3 font-medium" style={{ color: BRAND_RED }}>
                      {item.year}
                    </span>
                  </div>
                  <div className="pb-4">
                    <h3 className="font-serif font-medium text-xl mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.58)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="brand-line mx-auto block" />
            <h2 className="font-serif font-light mt-6 text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className={`reveal delay-${i * 100} border border-white/8 p-8`}>
                <Icon size={28} className="mb-6" style={{ color: BRAND_RED }} />
                <h3 className="font-serif font-light text-xl text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,250,250,0.45)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio photo strip */}
      <div className="grid grid-cols-4 h-64">
        {['studio-a', 'studio-b', 'studio-c', 'studio-d'].map((seed, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={`https://picsum.photos/seed/${seed}/400/300`}
              alt="Studio"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="py-20 px-6" style={{ background: '#fafafa' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal flex justify-center"><span className="brand-line" /></div>
          <h2 className="reveal font-serif font-light mt-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            Come Meet Us in Auroville
          </h2>
          <p className="reveal delay-200 mt-5 text-sm leading-relaxed mb-10" style={{ color: 'rgba(10,10,10,0.55)', maxWidth: '420px', margin: '1.25rem auto 2.5rem' }}>
            Visit the studio, attend a workshop, or simply stop by to see the work in progress. We love meeting people who care about fashion differently.
          </p>
          <div className="reveal delay-300 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('workshops')}
              className="px-8 py-4 text-xs tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-85"
              style={{ background: BRAND_RED }}
            >
              Book a Workshop
            </button>
            <button
              onClick={() => navigate('custom')}
              className="px-8 py-4 text-xs tracking-[0.2em] uppercase border transition-colors hover:bg-black hover:text-white"
              style={{ borderColor: '#0a0a0a' }}
            >
              Custom Design →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
