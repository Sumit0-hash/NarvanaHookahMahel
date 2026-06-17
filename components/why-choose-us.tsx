import { Shield, Truck, Award, Headphones } from 'lucide-react';

const FEATURES = [
  {
    icon: Shield,
    title: 'Authentic Products',
    description: 'Sab genuine brands, no fakes. Quality guaranteed with every purchase.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Zirakpur aur surrounding areas mein same-day delivery available hai.',
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Competitive prices with regular discounts. Best value for your money.',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Hookah setup se leke flavour recommendations tak - hum hamesha saath hai.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-charcoal-900">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
            Humare Paas Kyun <span className="gold-gradient-text">Aayein?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl text-center hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 mb-4 group-hover:bg-gold-500/20 transition-colors">
                <feature.icon size={24} className="text-gold-500" />
              </div>
              <h3 className="text-base font-semibold text-charcoal-100 mb-2">{feature.title}</h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
