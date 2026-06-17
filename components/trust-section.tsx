import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rahul S.',
    location: 'Zirakpur',
    text: 'Best hookah shop in the area! Khalil Mamoon ki quality outstanding hai. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Priya M.',
    location: 'Panchkula',
    text: 'Flavours ka collection bohot vast hai. Social Smoke aur Al Fakher sab available hai. Delivery bhi fast hai.',
    rating: 5,
  },
  {
    name: 'Amit K.',
    location: 'Chandigarh',
    text: 'Steamulation hookah liya tha yahan se - genuine product aur best price. Staff bhi helpful hai.',
    rating: 4,
  },
];

export function TrustSection() {
  return (
    <section className="section-padding bg-charcoal-800/50">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-3">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
            Humare Customers Ka <span className="gold-gradient-text">Experience</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl"
            >
              <Quote size={24} className="text-gold-500/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < testimonial.rating ? 'fill-gold-500 text-gold-500' : 'text-charcoal-600'}
                  />
                ))}
              </div>
              <p className="text-sm text-charcoal-300 leading-relaxed mb-4">{testimonial.text}</p>
              <div>
                <p className="text-sm font-medium text-charcoal-100">{testimonial.name}</p>
                <p className="text-xs text-charcoal-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
