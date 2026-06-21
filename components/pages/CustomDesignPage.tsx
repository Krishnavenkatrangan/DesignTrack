import React, { useState, useEffect } from 'react';
import { CheckCircle, MessageCircle, Scissors, Sparkles, Package, ArrowRight } from 'lucide-react';
import { Page } from '../../types';

const BRAND_RED = '#8B1A1A';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const PROCESS = [
  {
    step: '01',
    icon: MessageCircle,
    title: 'Consultation',
    desc: 'We begin with a conversation — in person at the studio or via video call — to understand you, your garments, and your vision for the transformation.',
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'Design Ideas',
    desc: 'Arpitha develops two to three design directions for your garments, sharing sketches and fabric swatches for your review and feedback.',
  },
  {
    step: '03',
    icon: Scissors,
    title: 'Transformation',
    desc: 'Once a direction is approved, the artisans get to work. Depending on complexity, this typically takes two to four weeks.',
  },
  {
    step: '04',
    icon: Package,
    title: 'Final Creation',
    desc: 'Your transformed garments are delivered to the studio or shipped to you anywhere in India, beautifully packaged with the story of their creation.',
  },
];

const FAQs = [
  {
    q: 'What garments can I bring?',
    a: 'Almost anything with fabric — saris, kurtas, shirts, dresses, denim, leather, cotton, silk. The only restriction is heavily damaged or synthetic fabrics that cannot be worked with safely.',
  },
  {
    q: 'How long does the process take?',
    a: 'From consultation to delivery, most projects take 3–5 weeks. Complex multi-piece projects may take longer. We will always give you a realistic timeline upfront.',
  },
  {
    q: 'What does it cost?',
    a: 'Prices start at ₹2,500 for a single garment transformation and vary based on complexity, techniques used, and additional materials required. A full quote is provided after the initial consultation.',
  },
  {
    q: 'Can I stay involved in the process?',
    a: 'Absolutely. We send progress photographs and welcome your input at every stage. Some clients even visit the studio midway to see their pieces in progress.',
  },
  {
    q: 'Do you ship outside India?',
    a: 'Yes. We ship internationally. Shipping costs and times vary by destination. Please mention this at enquiry.',
  },
];

const EnquiryForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', garmentDesc: '', vision: '', timeline: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <CheckCircle size={52} className="mx-auto mb-6" style={{ color: BRAND_RED }} />
        <h3 className="font-serif font-light text-3xl mb-3">Thank you, {form.name.split(' ')[0]}.</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)', maxWidth: '400px', margin: '0 auto' }}>
          We have received your enquiry and will be in touch within 48 hours to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>
            Phone (optional)
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>
            Desired Timeline
          </label>
          <select
            value={form.timeline}
            onChange={e => setForm({ ...form, timeline: e.target.value })}
            className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent"
          >
            <option value="">No rush</option>
            <option value="4-weeks">Within 4 weeks</option>
            <option value="6-weeks">Within 6 weeks</option>
            <option value="2-months">Within 2 months</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>
          Describe the garments you have *
        </label>
        <textarea
          required
          rows={3}
          value={form.garmentDesc}
          onChange={e => setForm({ ...form, garmentDesc: e.target.value })}
          className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent resize-none"
          placeholder="e.g. 'Three old saris in different silks', 'A wedding dress I no longer wear', 'A collection of my late mother's kurtis'..."
        />
      </div>

      <div>
        <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>
          Your vision (if any)
        </label>
        <textarea
          rows={3}
          value={form.vision}
          onChange={e => setForm({ ...form, vision: e.target.value })}
          className="w-full border-b border-black/20 pb-3 text-sm outline-none focus:border-black transition-colors bg-transparent resize-none"
          placeholder="What do you dream these garments could become? You can also leave this entirely to us."
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-12 py-4 text-sm tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-85"
          style={{ background: '#0a0a0a' }}
        >
          Send Enquiry
        </button>
        <p className="text-xs mt-4" style={{ color: 'rgba(10,10,10,0.38)' }}>
          We respond to all enquiries within 48 hours.
        </p>
      </div>
    </form>
  );
};

const CustomDesignPage: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useScrollReveal();

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="relative pt-28 pb-24 px-6 overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/custom-hero/1400/700" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.6))' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-5" style={{ color: '#f0a0a0' }}>Custom Design Service</p>
            <h1 className="font-serif font-light text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}>
              Reimagine What<br /><em>You Already Own.</em>
            </h1>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(250,250,250,0.55)', maxWidth: '440px' }}>
              Do you have garments that you love but no longer wear? Bring them to the studio and let us transform them into something that reflects your present style and personality.
            </p>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase text-white border border-white/30 hover:border-white/70 transition-colors"
            >
              Begin Your Enquiry <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['custom-a', 'custom-b', 'custom-c', 'custom-d'].map((seed, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img src={`https://picsum.photos/seed/${seed}/300/300`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-24 px-6" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="brand-line mx-auto block" />
            <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              How It Works
            </h2>
            <p className="mt-4 text-sm" style={{ color: 'rgba(10,10,10,0.5)', maxWidth: '440px', margin: '1rem auto 0' }}>
              A thoughtful, collaborative process designed around your garments, your story, and your vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map(({ step, icon: Icon, title, desc }, i) => (
              <div key={i} className={`reveal delay-${i * 100} relative`}>
                {/* Connector line */}
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px -translate-y-1/2 z-0" style={{ background: 'rgba(139,26,26,0.15)', right: '-1px' }} />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-serif text-4xl font-light" style={{ color: 'rgba(139,26,26,0.2)' }}>{step}</span>
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ borderColor: BRAND_RED }}>
                      <Icon size={16} style={{ color: BRAND_RED }} />
                    </div>
                  </div>
                  <h3 className="font-medium text-base mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before/after examples */}
      <div className="py-20 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-12">
            <h2 className="font-serif font-light text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Past Transformations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { before: 'Vintage silk sari, unworn for 12 years', after: 'Contemporary wrap dress', beforeSeed: 'transform-a-before', afterSeed: 'transform-a-after' },
              { before: 'Three faded cotton kurtas', after: 'Patchwork jacket', beforeSeed: 'transform-b-before', afterSeed: 'transform-b-after' },
              { before: 'Wedding lehenga (no longer wearable)', after: 'Two blouses + embroidered cushion cover', beforeSeed: 'transform-c-before', afterSeed: 'transform-c-after' },
            ].map((item, i) => (
              <div key={i} className={`reveal delay-${i * 150}`}>
                <div className="grid grid-cols-2 gap-1 mb-4">
                  <div>
                    <div className="aspect-square overflow-hidden mb-2">
                      <img src={`https://picsum.photos/seed/${item.beforeSeed}/300/300`} alt="Before" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-white/40 text-center">Before</p>
                  </div>
                  <div>
                    <div className="aspect-square overflow-hidden mb-2">
                      <img src={`https://picsum.photos/seed/${item.afterSeed}/300/300`} alt="After" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-white/40 text-center">After</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 italic text-center">{item.before} → {item.after}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry form */}
      <div id="enquiry" className="py-24 px-6" style={{ background: '#f5f0eb' }}>
        <div className="max-w-3xl mx-auto">
          <div className="reveal mb-12">
            <span className="brand-line" />
            <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Enquire About Custom Design
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)', maxWidth: '440px' }}>
              Tell us about your garments and what you have in mind. We will get back to you within 48 hours to schedule a consultation.
            </p>
          </div>
          <div className="reveal delay-200">
            <EnquiryForm />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-24 px-6" style={{ background: '#fafafa' }}>
        <div className="max-w-3xl mx-auto">
          <div className="reveal mb-12">
            <span className="brand-line" />
            <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              Common Questions
            </h2>
          </div>
          <div className="space-y-0">
            {FAQs.map((faq, i) => (
              <div key={i} className="reveal border-b border-black/10">
                <button
                  className="w-full flex items-center justify-between py-5 text-left transition-colors hover:opacity-70"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm pr-6">{faq.q}</span>
                  <span className="text-xl flex-shrink-0 transition-transform" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none', color: BRAND_RED }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.58)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesignPage;
