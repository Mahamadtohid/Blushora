// Sample catalogue — all prices in INR, all content original.
// Images use Unsplash source URLs scoped to beauty/skincare queries.

export const CATEGORIES = [
  { id: 'skincare', label: 'Skincare', tag: '01' },
  { id: 'makeup', label: 'Makeup', tag: '02' },
  { id: 'haircare', label: 'Haircare', tag: '03' },
  { id: 'fragrance', label: 'Fragrance', tag: '04' },
  { id: 'bath-body', label: 'Bath & Body', tag: '05' }
]

export const PRODUCTS = [
  {
    id: 'sk-01',
    name: 'Velvet Dusk Serum',
    category: 'skincare',
    price: 1890,
    rating: 4.8,
    desc: 'Niacinamide + hyaluronic cocktail for a glass-skin finish.',
    tagline: 'The glow upgrade',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80',
    featured: true
  },
  {
    id: 'sk-02',
    name: 'Petal Rain Toner',
    category: 'skincare',
    price: 1240,
    rating: 4.6,
    desc: 'Rose water + green tea mist. Zero alcohol, max hydration.',
    tagline: 'Hydrates in one spritz',
    img: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=900&q=80'
  },
  {
    id: 'sk-03',
    name: 'Golden Hour Oil',
    category: 'skincare',
    price: 2490,
    rating: 4.9,
    desc: 'Squalane and marula for an un-shiny lit-from-within glow.',
    tagline: 'Dry-skin savior',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=80',
    featured: true
  },
  {
    id: 'sk-04',
    name: 'Midnight Reset Cream',
    category: 'skincare',
    price: 2890,
    rating: 4.7,
    desc: 'Retinal 0.1% + peptides to rewrite tomorrow’s skin.',
    tagline: 'Night shift, done right',
    img: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=900&q=80'
  },
  {
    id: 'mk-01',
    name: 'Afterglow Lip Tint',
    category: 'makeup',
    price: 790,
    rating: 4.5,
    desc: 'A watery stain in shade “Burnt Peach.” Lasts eight hours.',
    tagline: 'Barely-there, forever',
    img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&q=80',
    featured: true
  },
  {
    id: 'mk-02',
    name: 'Second Skin Foundation',
    category: 'makeup',
    price: 1690,
    rating: 4.7,
    desc: 'Thirty-six shades of weightless, buildable, flex-wear base.',
    tagline: 'Looks like you',
    img: 'https://images.unsplash.com/photo-1583241800698-9c3550778f72?w=900&q=80'
  },
  {
    id: 'mk-03',
    name: 'Hush Blush Palette',
    category: 'makeup',
    price: 1990,
    rating: 4.8,
    desc: 'Six talc-free powders from “First Blush” to “Sundown.”',
    tagline: 'From day to dusk',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=80'
  },
  {
    id: 'mk-04',
    name: 'Monsoon Mascara',
    category: 'makeup',
    price: 890,
    rating: 4.6,
    desc: 'Lifts, lengthens, then refuses to budge. 24-hr clean wear.',
    tagline: 'Lashes, upgraded',
    img: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=900&q=80'
  },
  {
    id: 'hc-01',
    name: 'Rice Water Shampoo',
    category: 'haircare',
    price: 690,
    rating: 4.5,
    desc: 'Fermented rice + biotin. Softer strands by week two.',
    tagline: 'Shine on repeat',
    img: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=900&q=80'
  },
  {
    id: 'hc-02',
    name: 'Deep Dive Conditioner',
    category: 'haircare',
    price: 790,
    rating: 4.4,
    desc: 'A rinse-out mask disguised as a conditioner. Three ceramides.',
    tagline: 'For thirsty strands',
    img: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=900&q=80'
  },
  {
    id: 'hc-03',
    name: 'Scalp Spa Oil',
    category: 'haircare',
    price: 1290,
    rating: 4.7,
    desc: 'Rosemary + mint. Twenty-minute ritual, two-week results.',
    tagline: 'Treat the roots',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dde1b26c?w=900&q=80'
  },
  {
    id: 'fr-01',
    name: 'Smoke & Rose',
    category: 'fragrance',
    price: 3890,
    rating: 4.9,
    desc: 'Oud, Damask rose, a trace of leather. Eau de parfum, 50ml.',
    tagline: 'Signature territory',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80',
    featured: true
  },
  {
    id: 'fr-02',
    name: 'Clementine Hour',
    category: 'fragrance',
    price: 2890,
    rating: 4.6,
    desc: 'Bergamot, neroli, warm vetiver. For bright, sharp mornings.',
    tagline: 'Wake up on it',
    img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80'
  },
  {
    id: 'fr-03',
    name: 'Paper Moon',
    category: 'fragrance',
    price: 3290,
    rating: 4.8,
    desc: 'Iris, white musk, powdered amber. A quiet, lingering trail.',
    tagline: 'Whisper, don’t shout',
    img: 'https://images.unsplash.com/photo-1557170334-a9086d21c527?w=900&q=80'
  },
  {
    id: 'bb-01',
    name: 'Oat Milk Body Wash',
    category: 'bath-body',
    price: 490,
    rating: 4.4,
    desc: 'Creamy foam, sulfate-free. Smells like a Sunday morning.',
    tagline: 'Soft everything',
    img: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=900&q=80'
  },
  {
    id: 'bb-02',
    name: 'Honey Butter Lotion',
    category: 'bath-body',
    price: 790,
    rating: 4.7,
    desc: 'Shea, mango, raw honey. Twenty-four-hour quilt for your skin.',
    tagline: 'All-day cushion',
    img: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=900&q=80'
  },
  {
    id: 'bb-03',
    name: 'Salt Room Soak',
    category: 'bath-body',
    price: 990,
    rating: 4.6,
    desc: 'Himalayan salt + eucalyptus. For long baths and long days.',
    tagline: 'Twenty-minute reset',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80'
  }
]

export const EDITORIAL = [
  {
    kicker: 'Journal — Edit 09',
    title: 'The art of a slow routine',
    read: '6 min read',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80'
  },
  {
    kicker: 'Journal — Edit 10',
    title: 'How a scent becomes a memory',
    read: '4 min read',
    img: 'https://images.unsplash.com/photo-1557170334-a9086d21c527?w=1200&q=80'
  },
  {
    kicker: 'Journal — Edit 11',
    title: 'The quiet case for the five-step routine',
    read: '8 min read',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80'
  }
]

export const TESTIMONIALS = [
  {
    quote:
      'The Velvet Dusk Serum is the first bottle in a year I actually finished. My skin looks like I slept.',
    name: 'Aarushi K.',
    role: 'Verified buyer, Mumbai'
  },
  {
    quote:
      'I don’t review beauty products. I made an exception for the Afterglow tint. It’s really that good.',
    name: 'Meher B.',
    role: 'Verified buyer, Bengaluru'
  },
  {
    quote:
      'Smoke & Rose is now my husband’s favourite thing I own. Won’t be sharing.',
    name: 'Sana R.',
    role: 'Verified buyer, Delhi'
  }
]
