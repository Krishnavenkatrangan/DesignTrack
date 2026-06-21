export interface Product {
  id: string;
  name: string;
  category: 'dresses' | 'tops' | 'bottoms' | 'accessories' | 'scarves';
  price: number;
  image: string;
  story: string;
  materials: string[];
  isLimited: boolean;
  availableCount: number;
  isNew: boolean;
  originalItem: string;
}

export interface Workshop {
  id: string;
  title: string;
  category: 'basics' | 'repair' | 'styling' | 'diy' | 'private' | 'corporate';
  date: string;
  time: string;
  duration: string;
  price: number;
  spotsLeft: number;
  totalSpots: number;
  description: string;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'All Levels';
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'sustainability' | 'fashion-stories' | 'diy' | 'studio-diary' | 'inspiration';
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  type: 'shop' | 'workshop' | 'custom';
  avatar: string;
}

export type Page = 'home' | 'shop' | 'workshops' | 'journal' | 'about' | 'custom';
