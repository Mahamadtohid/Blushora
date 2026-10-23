const COLS = [
  {
    heading: 'Shop',
    links: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bath & Body']
  },
  {
    heading: 'House',
    links: ['Our story', 'The Journal', 'Ingredients', 'Press', 'Careers']
  },
  {
    heading: 'Help',
    links: ['Contact', 'Shipping', 'Returns', 'FAQ', 'Store locator']
  }
]

export default function Footer() {
  return (
    <footer className="bg-cream-200/70 text-wine-700 pt-16 md:pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <a
              href="#"
              className="font-display text-5xl md:text-6xl tracking-tightest leading-none"
            >
              Blush
              <span className="serif-italic text-blush-500">ora</span>
              <span className="text-honey-500">.</span>
            </a>
            <p className="mt-6 max-w-sm text-[14.5px] text-wine-700/70 leading-relaxed">
              An original beauty house. Clean ingredients, slow routines, and a
              shade range that doesn’t stop at Fair-Beige. Made with care in
              Mumbai; shipped to the world.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/50">
              <span className="w-2 h-2 inline-block rounded-full bg-honey-500 mr-2 align-middle" />
              Demo build · nothing is really charged
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.heading} className="col-span-6 md:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/55">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="ink-link">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/55">
              Follow
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <a href="#" className="ink-link">
                  Instagram <span className="opacity-50">@blushora</span>
                </a>
              </li>
              <li>
                <a href="#" className="ink-link">
                  Pinterest <span className="opacity-50">/blushorahouse</span>
                </a>
              </li>
              <li>
                <a href="#" className="ink-link">
                  TikTok <span className="opacity-50">@blushora.co</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-wine-700/15 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/55">
          <span>© 2026 Blushora House Pvt. Ltd.</span>
          <span>Privacy · Terms · Accessibility</span>
          <span>Crafted in India</span>
        </div>
      </div>
    </footer>
  )
}
