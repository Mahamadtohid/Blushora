const WORDS = [
  'Niacinamide',
  'Squalane',
  'Damask Rose',
  'Vitamin C',
  'Peptides',
  'Hyaluronic',
  'Retinal',
  'Marula Oil',
  'Centella',
  'Vetiver'
]

export default function Marquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <section className="bg-wine-700 text-cream-50 py-5 border-y border-wine-800 overflow-hidden">
      <div className="flex items-center whitespace-nowrap marquee-track font-display text-3xl md:text-5xl">
        {row.map((w, i) => (
          <span key={i} className="mx-10 flex items-center gap-10">
            <em className="serif-italic text-honey-400">{w}</em>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blush-400">
              <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
            </svg>
          </span>
        ))}
      </div>
    </section>
  )
}
