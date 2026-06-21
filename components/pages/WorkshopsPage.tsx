import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, ArrowRight, X } from 'lucide-react';
import { WORKSHOPS, TESTIMONIALS } from '../../constants';
import { Workshop } from '../../types';

const BRAND_RED = '#8B1A1A';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const LEVEL_COLORS = {
  Beginner: { bg: '#e8f5e9', color: '#2e7d32' },
  Intermediate: { bg: '#fff3e0', color: '#e65100' },
  'All Levels': { bg: '#e3f2fd', color: '#1565c0' },
};

const BookingModal: React.FC<{ workshop: Workshop; onClose: () => void }> = ({ workshop, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const seatPct = ((workshop.totalSpots - workshop.spotsLeft) / workshop.totalSpots) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) setStep('success');
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white max-w-2xl w-full mx-4 overflow-hidden" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="relative p-8 pb-6" style={{ background: '#0a0a0a' }}>
              <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#f0a0a0' }}>
                Reserve Your Spot
              </p>
              <h2 className="font-serif font-light text-white text-2xl">{workshop.title}</h2>
              <div className="flex flex-wrap gap-4 mt-4 text-sm" style={{ color: 'rgba(250,250,250,0.55)' }}>
                <span className="flex items-center gap-1.5"><Calendar size={14} />{workshop.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{workshop.time}</span>
                <span className="flex items-center gap-1.5"><Users size={14} />{workshop.spotsLeft} spots remaining</span>
              </div>
              {workshop.spotsLeft < 5 && workshop.spotsLeft < workshop.totalSpots && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1" style={{ color: 'rgba(250,250,250,0.4)' }}>
                    <span>Filling up fast</span>
                    <span>{workshop.spotsLeft} of {workshop.totalSpots} left</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${seatPct}%`, background: BRAND_RED }} />
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.45)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border-b border-black/20 pb-2.5 text-sm outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.45)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border-b border-black/20 pb-2.5 text-sm outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.45)' }}>
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-b border-black/20 pb-2.5 text-sm outline-none focus:border-black transition-colors bg-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.45)' }}>
                  Anything you'd like us to know?
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full border-b border-black/20 pb-2.5 text-sm outline-none focus:border-black transition-colors bg-transparent resize-none"
                  placeholder="Experience level, accessibility needs, questions..."
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-medium">₹{workshop.price.toLocaleString()}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(10,10,10,0.4)' }}>per person · materials included</p>
                </div>
                <button
                  type="submit"
                  className="px-10 py-4 text-sm tracking-[0.18em] uppercase text-white transition-opacity hover:opacity-85"
                  style={{ background: '#0a0a0a' }}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <CheckCircle size={52} className="mx-auto mb-6" style={{ color: BRAND_RED }} />
            <h3 className="font-serif font-light text-3xl mb-3">You're registered, {form.name.split(' ')[0]}.</h3>
            <p className="text-sm leading-relaxed mb-2" style={{ color: 'rgba(10,10,10,0.55)' }}>
              A confirmation has been sent to <strong>{form.email}</strong>.
            </p>
            <p className="text-sm mb-8" style={{ color: 'rgba(10,10,10,0.55)' }}>
              We'll be in touch with studio directions and what to bring.
            </p>
            <button onClick={onClose} className="text-xs tracking-[0.2em] uppercase hover-underline" style={{ color: BRAND_RED }}>
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const WorkshopCard: React.FC<{ workshop: Workshop; onBook: (w: Workshop) => void; index: number }> = ({
  workshop, onBook, index
}) => {
  const levelStyle = LEVEL_COLORS[workshop.level];
  const isFull = workshop.spotsLeft === 0;
  const isAlmostFull = workshop.spotsLeft <= 3;
  const isPrivate = workshop.category === 'private';

  return (
    <div className={`workshop-card reveal delay-${Math.min(index * 100, 400)} bg-white overflow-hidden`}
      style={{ border: '1px solid rgba(10,10,10,0.08)' }}>
      <div className="aspect-[16/9] overflow-hidden relative">
        <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span className="px-3 py-1 text-xs" style={{ background: levelStyle.bg, color: levelStyle.color }}>
            {workshop.level}
          </span>
          {isAlmostFull && !isFull && !isPrivate && (
            <span className="px-3 py-1 text-xs text-white" style={{ background: BRAND_RED }}>
              {workshop.spotsLeft} spots left
            </span>
          )}
        </div>
      </div>

      <div className="p-7">
        <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: BRAND_RED }}>
          {workshop.category.replace('-', ' ')} Workshop
        </p>
        <h3 className="font-serif font-light text-xl mb-3">{workshop.title}</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(10,10,10,0.55)' }}>
          {workshop.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: Calendar, text: workshop.date },
            { icon: Clock, text: workshop.duration },
            { icon: Users, text: isPrivate ? 'Private booking' : `${workshop.spotsLeft} / ${workshop.totalSpots} spots` },
            { icon: MapPin, text: 'Auroville Studio' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(10,10,10,0.5)' }}>
              <Icon size={13} style={{ color: BRAND_RED, flexShrink: 0 }} />
              {text}
            </div>
          ))}
        </div>

        <div className="space-y-1.5 mb-6">
          {workshop.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(10,10,10,0.6)' }}>
              <CheckCircle size={12} style={{ color: BRAND_RED, flexShrink: 0 }} />
              {h}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-black/8">
          <div>
            <p className="font-medium text-lg">₹{workshop.price.toLocaleString()}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(10,10,10,0.4)' }}>per person</p>
          </div>
          <button
            onClick={() => !isFull && onBook(workshop)}
            disabled={isFull}
            className="px-6 py-3 text-xs tracking-[0.18em] uppercase text-white transition-opacity disabled:opacity-40 hover:opacity-85"
            style={{ background: isFull ? '#999' : '#0a0a0a' }}
          >
            {isFull ? 'Sold Out' : isPrivate ? 'Enquire' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkshopsPage: React.FC = () => {
  const [selected, setSelected] = useState<Workshop | null>(null);

  useScrollReveal();

  const workshopTestimonial = TESTIMONIALS.find(t => t.type === 'workshop');

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="relative pt-28 pb-24 px-6 overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/workshop-hero/1400/600" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.9) 40%, rgba(10,10,10,0.4))' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase mb-5" style={{ color: '#f0a0a0' }}>Auroville Studio</p>
          <h1 className="font-serif font-light text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', maxWidth: '600px' }}>
            Learn Sustainable Fashion<br /><em>Hands-On.</em>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,250,250,0.55)', maxWidth: '460px' }}>
            Small group workshops where you transform old garments with your own hands. No experience required — just curiosity and a willingness to try.
          </p>
        </div>
      </div>

      {/* Workshop cards */}
      <div className="py-24 px-6" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="brand-line mx-auto block" />
            <h2 className="font-serif font-light mt-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Upcoming Workshops
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {WORKSHOPS.map((w, i) => (
              <WorkshopCard key={w.id} workshop={w} onBook={setSelected} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial callout */}
      {workshopTestimonial && (
        <div className="py-20 px-6" style={{ background: '#8B1A1A' }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-serif italic text-2xl leading-relaxed text-white mb-8">
              "{workshopTestimonial.text}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <img src={workshopTestimonial.avatar} alt={workshopTestimonial.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{workshopTestimonial.name}</p>
                <p className="text-xs text-white/60">{workshopTestimonial.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Private / Corporate */}
      <div className="py-24 px-6" style={{ background: '#f5f0eb' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              title: 'Private Workshops',
              desc: 'Celebrate a birthday, hen party, or simply treat yourself and a group of friends to a fully personalised session at our Auroville studio.',
              image: 'https://picsum.photos/seed/private-ws/600/400',
            },
            {
              title: 'Corporate & Team Events',
              desc: 'Foster creativity and sustainability awareness in your team. We design half-day and full-day experiential workshops for organisations of any size.',
              image: 'https://picsum.photos/seed/corporate-ws/600/400',
            },
          ].map((item, i) => (
            <div key={i} className={`reveal-${i === 0 ? 'left' : 'right'} group cursor-pointer`}>
              <div className="aspect-[16/9] overflow-hidden mb-6">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="font-serif font-light text-2xl mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(10,10,10,0.55)' }}>{item.desc}</p>
              <button
                onClick={() => setSelected(WORKSHOPS.find(w => w.category === 'private') || WORKSHOPS[0])}
                className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover-underline"
                style={{ color: BRAND_RED }}
              >
                Enquire Now <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {selected && <BookingModal workshop={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default WorkshopsPage;
