import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,168,71,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,168,71,0.2) 0%, transparent 40%)',
      }} />
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A847' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full mb-6">
            <Sparkles size={14} className="text-gold-500" />
            <span className="text-xs text-gold-400 font-medium">Premium Hookah Collection</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1]">
            <span className="text-charcoal-50">Narwana</span>
            <br />
            <span className="gold-gradient-text">Hookah Mahal</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-charcoal-300 leading-relaxed max-w-xl">
            Narwana Hookah Mahal mein aapka swagat hai. Premium hookahs, exotic flavours,
            aur top-quality accessories &mdash; sab kuch ek jagah par.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/20"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-charcoal-600 text-charcoal-200 text-sm font-medium rounded-lg hover:border-gold-500/50 hover:text-gold-500 transition-all duration-200"
            >
              Shop by Category
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gold-500">500+</p>
              <p className="text-xs text-charcoal-400 mt-0.5">Products</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gold-500">50+</p>
              <p className="text-xs text-charcoal-400 mt-0.5">Brands</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gold-500">10K+</p>
              <p className="text-xs text-charcoal-400 mt-0.5">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-charcoal-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold-500/50 to-transparent" />
      </div>
    </section>
  );
}
