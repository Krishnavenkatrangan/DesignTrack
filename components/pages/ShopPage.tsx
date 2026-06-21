import React, { useState, useEffect } from 'react';
import { Heart, Eye, Filter, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../../constants';
import { Product } from '../../types';

const BRAND_RED = '#8B1A1A';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .reveal-scale');
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

type FilterCategory = 'all' | 'dresses' | 'tops' | 'bottoms' | 'accessories' | 'scarves' | 'new';

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All Pieces', value: 'all' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Dresses', value: 'dresses' },
  { label: 'Tops', value: 'tops' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Scarves', value: 'scarves' },
  { label: 'Accessories', value: 'accessories' },
];

const ProductDetailModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => (
  <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="bg-white max-w-3xl w-full mx-4 flex overflow-hidden" style={{ maxHeight: '90vh' }}>
      <div className="w-1/2 relative hidden md:block">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.isLimited && (
          <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-[0.15em] uppercase text-white" style={{ background: BRAND_RED }}>
            Only {product.availableCount} left
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-black/30 hover:text-black transition-colors">
          <X size={20} />
        </button>
        <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: BRAND_RED }}>
          {product.category}
        </p>
        <h2 className="font-serif font-light text-2xl mb-1">{product.name}</h2>
        <p className="text-xl font-medium mb-6">₹{product.price.toLocaleString()}</p>

        <div className="mb-6 pb-6 border-b border-black/8">
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>The Story</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.65)' }}>{product.story}</p>
        </div>

        <div className="mb-6 pb-6 border-b border-black/8">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(10,10,10,0.4)' }}>Made From</p>
          <ul className="space-y-1.5">
            {product.materials.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(10,10,10,0.65)' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BRAND_RED }} />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(10,10,10,0.4)' }}>Original Item</p>
          <p className="text-sm italic font-serif" style={{ color: BRAND_RED }}>{product.originalItem}</p>
        </div>

        <div className="space-y-3">
          <button
            className="w-full py-4 text-sm tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-85 flex items-center justify-center gap-2"
            style={{ background: '#0a0a0a' }}
          >
            <ShoppingBag size={15} /> Add to Cart
          </button>
          <button className="w-full py-3.5 text-sm tracking-[0.2em] uppercase border border-black/15 flex items-center justify-center gap-2 hover:bg-black/4 transition-colors">
            <Heart size={15} /> Save to Wishlist
          </button>
        </div>

        {product.isLimited && (
          <p className="text-xs mt-4 text-center" style={{ color: BRAND_RED }}>
            ✦ Only {product.availableCount} piece{product.availableCount !== 1 ? 's' : ''} available — each one unique
          </p>
        )}
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product; onView: (p: Product) => void; delay?: number }> = ({
  product, onView, delay = 0
}) => {
  const [wished, setWished] = useState(false);

  return (
    <div className={`product-card reveal delay-${delay} aspect-[3/4] group`}>
      <img src={product.image} alt={product.name} className="product-img w-full h-full object-cover" />

      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-3 py-1 text-xs tracking-[0.15em] uppercase bg-white text-black">New</span>
        )}
        {product.isLimited && (
          <span className="px-3 py-1 text-xs tracking-[0.12em] uppercase text-white" style={{ background: BRAND_RED }}>
            {product.availableCount === 1 ? 'Only 1 left' : `${product.availableCount} left`}
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.stopPropagation(); setWished(!wished); }}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
      >
        <Heart size={15} fill={wished ? BRAND_RED : 'none'} style={{ color: wished ? BRAND_RED : '#0a0a0a' }} />
      </button>

      {/* Hover actions */}
      <div className="product-actions">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-white font-serif text-lg leading-tight">{product.name}</p>
            <p className="text-white/60 text-xs mt-0.5">₹{product.price.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => onView(product)}
              className="px-4 py-2 text-xs tracking-[0.12em] uppercase bg-white text-black hover:bg-red-900 hover:text-white transition-colors flex items-center gap-1"
            >
              <Eye size={11} /> Quick View
            </button>
            <button
              className="px-4 py-2 text-xs tracking-[0.12em] uppercase border border-white/50 text-white hover:bg-white hover:text-black transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  useScrollReveal();

  const filtered = PRODUCTS.filter(p => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return p.isNew;
    return p.category === activeFilter;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="page-transition">
      {/* Hero */}
      <div className="relative pt-28 pb-20 px-6 text-center overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/shop-hero/1200/500" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: '#f0a0a0' }}>The Collection</p>
          <h1 className="font-serif font-light text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Thoughtfully Designed.<br /><em>Carefully Created.</em>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,250,250,0.55)', maxWidth: '480px', margin: '0 auto' }}>
            Most pieces begin their journey as carefully selected pre-loved garments and existing textiles. Through design and craftsmanship, they become contemporary pieces worthy of being loved again.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-black/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className="px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all"
                style={{
                  background: activeFilter === value ? '#0a0a0a' : 'transparent',
                  color: activeFilter === value ? '#fafafa' : 'rgba(10,10,10,0.5)',
                  border: `1px solid ${activeFilter === value ? '#0a0a0a' : 'rgba(10,10,10,0.12)'}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'rgba(10,10,10,0.4)' }}>{filtered.length} piece{filtered.length !== 1 ? 's' : ''}</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs border border-black/12 px-3 py-2 outline-none bg-transparent"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light mb-3">No pieces in this category yet.</p>
            <p className="text-sm" style={{ color: 'rgba(10,10,10,0.4)' }}>New arrivals are added regularly — check back soon.</p>
            <button onClick={() => setActiveFilter('all')} className="mt-6 text-xs tracking-[0.2em] uppercase hover-underline" style={{ color: BRAND_RED }}>
              View all pieces
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={setSelectedProduct}
                delay={Math.min(i * 75, 400)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Craft section */}
      <div className="py-20 px-6" style={{ background: '#f5f0eb' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal flex justify-center"><span className="brand-line" /></div>
          <h2 className="reveal font-serif font-light mt-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            Every Piece Has a Story
          </h2>
          <p className="reveal delay-200 mt-5 text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.55)', maxWidth: '480px', margin: '1.25rem auto 0' }}>
            Each creation begins with a pre-loved garment. We share the story of every original piece alongside every purchase — because the history of the material matters as much as the garment itself.
          </p>
          <div className="reveal delay-300 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-white"
              style={{ background: BRAND_RED }}
            >
              Learn Our Process
            </button>
            <button className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase border transition-colors hover:bg-black hover:text-white" style={{ borderColor: '#0a0a0a' }}>
              Custom Design →
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ShopPage;
