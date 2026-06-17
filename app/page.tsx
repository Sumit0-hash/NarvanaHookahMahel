import { HeroSection } from '@/components/hero-section';
import { WhyChooseUs } from '@/components/why-choose-us';
import { TrustSection } from '@/components/trust-section';
import { LocationSection } from '@/components/location-section';
import { ProductCard } from '@/components/product-card';
import { CategoryCard } from '@/components/category-card';
import { PLACEHOLDER_PRODUCTS, CATEGORIES } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function HomePage() {
  const featuredProducts = PLACEHOLDER_PRODUCTS.filter((_, i) => i < 4);
  const newArrivals = PLACEHOLDER_PRODUCTS.filter((p) => p.tags.includes('new') || p.tags.includes('bestseller')).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Premium Collection Section */}
      <section className="section-padding bg-charcoal-800/30">
        <div className="container-luxury">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">Curated Selection</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
                Premium Hookah <span className="gold-gradient-text">Collection</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors font-medium"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                handle={product.handle}
                title={product.title}
                description={product.description}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                image={product.image}
                productType={product.productType}
                tags={[...product.tags]}
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold-500/30 text-gold-500 text-sm font-medium rounded-lg hover:bg-gold-500/10 transition-colors"
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="section-padding bg-charcoal-900">
        <div className="container-luxury">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
              Shop By <span className="gold-gradient-text">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.handle}
                handle={cat.handle}
                title={cat.title}
                description={cat.description}
                image={cat.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured / New Arrivals */}
      <section className="section-padding bg-charcoal-800/30">
        <div className="container-luxury">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">Just Dropped</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
                Featured <span className="gold-gradient-text">Products</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors font-medium"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                handle={product.handle}
                title={product.title}
                description={product.description}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                image={product.image}
                productType={product.productType}
                tags={[...product.tags]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Trust Section */}
      <TrustSection />

      {/* Location Section */}
      <LocationSection />

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-800 border-t border-b border-gold-500/10">
        <div className="container-luxury text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50 mb-4">
            Koi sawal hai? <span className="gold-gradient-text">Humse baat karo!</span>
          </h2>
          <p className="text-sm text-charcoal-400 max-w-md mx-auto mb-8">
            Product query ho, order tracking ho, ya hookah setup mein help chahiye &mdash; hum hamesha available hai.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-500 transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp karo
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold-500/30 text-gold-500 text-sm font-medium rounded-lg hover:bg-gold-500/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
