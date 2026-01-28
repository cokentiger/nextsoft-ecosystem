export interface HeroConfig {
  eyebrow?: string;
  headline: string;
  highlight?: string;
  description: string;
  primaryCTA?: { label: string; href: string };
  background_style?: 'grid' | 'white';
}

export interface BentoItem {
  name: string;
  desc: string;
  variant: 'featured' | 'normal';
  link?: string;
  badge?: string;
  icon?: string;
}

export interface BentoConfig {
  title: string;
  items: BentoItem[];
}