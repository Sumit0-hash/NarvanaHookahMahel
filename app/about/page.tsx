import type { Metadata } from 'next';
import { MapPin, Award, Users, Heart, Clock, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Narwana Hookah Mahal - your premium hookah destination in Zirakpur since 2015.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative section-padding bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(212,168,71,0.3) 0%, transparent 50%)',
        }} />
        <div className="container-luxury relative">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-3">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-50 mb-6">
              Narwana Hookah <span className="gold-gradient-text">Mahal</span>
            </h1>
            <p className="text-lg text-charcoal-300 leading-relaxed">
              Ek premium hookah experience jo shuru hoti hai quality se aur khatam hoti hai
              customer satisfaction par. Humara journey 2015 se hai, aur aaj hum Zirakpur
              ke sabse trusted hookah store hai.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-padding bg-charcoal-900">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">Since 2015</p>
              <h2 className="text-3xl font-display font-bold text-charcoal-50 mb-6">
                Humara <span className="gold-gradient-text">Safar</span>
              </h2>
              <div className="space-y-4 text-sm text-charcoal-300 leading-relaxed">
                <p>
                  Narwana Hookah Mahal ki story shuru hui ek chhoti si shop se Dhakoli mein.
                  Humara founder, jisko hookah se bahut pyaar tha, ne ek sapna dekha - ki
                  Zirakpur ke logon ko genuine, premium quality hookah products milein at
                  fair prices.
                </p>
                <p>
                  Shuru mein sirf kuch brands the, par quality ne customers ko attract kiya.
                  Word-of-mouth se humara business grow hua. Aaj hum 50+ brands ke products
                  stock karte hai - Khalil Mamoon, Moze, Steamulation, Al Fakher, Social Smoke,
                  aur bahut saare international brands.
                </p>
                <p>
                  Humara philosophy simple hai: genuine products, best prices, aur outstanding
                  customer service. Har customer ko personal attention milta hai - chahe woh
                  beginner ho ya experienced hookah enthusiast.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl text-center">
                <Award size={28} className="text-gold-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gold-500">9+</p>
                <p className="text-xs text-charcoal-400 mt-1">Years Experience</p>
              </div>
              <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl text-center">
                <Users size={28} className="text-gold-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gold-500">10K+</p>
                <p className="text-xs text-charcoal-400 mt-1">Happy Customers</p>
              </div>
              <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl text-center">
                <Star size={28} className="text-gold-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gold-500">50+</p>
                <p className="text-xs text-charcoal-400 mt-1">Premium Brands</p>
              </div>
              <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl text-center">
                <Heart size={28} className="text-gold-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gold-500">500+</p>
                <p className="text-xs text-charcoal-400 mt-1">Products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-charcoal-800/30">
        <div className="container-luxury">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">What We Stand For</p>
            <h2 className="text-3xl font-display font-bold text-charcoal-50">
              Humari <span className="gold-gradient-text">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 mb-4">
                <Award size={22} className="text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-100 mb-2">Quality First</h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">
                Hum sirf genuine, authentic products bechte hai. No fakes, no compromises.
                Har product quality-checked hota hai before it reaches you.
              </p>
            </div>
            <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 mb-4">
                <Users size={22} className="text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-100 mb-2">Customer Care</h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">
                Har customer humare liye special hai. Product selection se leke setup tak,
                hum hamesha help ke liye available hai.
              </p>
            </div>
            <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold-500/10 border border-gold-500/20 mb-4">
                <Clock size={22} className="text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal-100 mb-2">Always Available</h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">
                WhatsApp, call, ya store visit - jo bhi aapke liye convenient ho.
                Quick response aur fast delivery humara commitment hai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="section-padding bg-charcoal-900">
        <div className="container-luxury text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">Come Visit</p>
          <h2 className="text-3xl font-display font-bold text-charcoal-50 mb-4">
            Humari Shop Mein <span className="gold-gradient-text">Aayein</span>
          </h2>
          <p className="text-sm text-charcoal-400 max-w-lg mx-auto mb-6">
            Personal experience ke liye humari shop visit karo. Humara staff aapki
            perfect hookah choose karne mein help karega.
          </p>
          <div className="inline-flex items-start gap-3 p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <MapPin size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm text-charcoal-200">{BUSINESS.address.street}</p>
              <p className="text-sm text-charcoal-300">{BUSINESS.address.area}, {BUSINESS.address.landmark}</p>
              <p className="text-sm text-charcoal-300">{BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pincode}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
