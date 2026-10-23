import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Categories from './components/Categories.jsx'
import ProductSection from './components/ProductSection.jsx'
import Editorial from './components/Editorial.jsx'
import Testimonials from './components/Testimonials.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import WishlistDrawer from './components/WishlistDrawer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import FloatingLipstick from './components/FloatingLipstick.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <FloatingLipstick />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <ProductSection />
        <Editorial />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
    </div>
  )
}
