import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS, WHATSAPP_URL } from '@/lib/constants';

export function LocationSection() {
  return (
    <section className="section-padding bg-charcoal-900">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-3">Visit Us</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-50">
            Humari <span className="gold-gradient-text">Location</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] bg-charcoal-800 rounded-xl border border-charcoal-700/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={40} className="mx-auto text-gold-500/40 mb-3" />
                <p className="text-sm text-charcoal-400">Interactive Map</p>
                <p className="text-xs text-charcoal-500 mt-1">
                  {BUSINESS.address.street}, {BUSINESS.address.area}
                </p>
              </div>
            </div>
            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(rgba(212,168,71,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,71,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20">
                  <MapPin size={18} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal-100 mb-1">Address</h3>
                  <p className="text-sm text-charcoal-400 leading-relaxed">
                    {BUSINESS.address.street}<br />
                    {BUSINESS.address.area}, {BUSINESS.address.landmark}<br />
                    {BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pincode}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20">
                  <Clock size={18} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal-100 mb-1">Working Hours</h3>
                  <p className="text-sm text-charcoal-400 leading-relaxed">
                    Monday - Saturday: 11:00 AM - 10:00 PM<br />
                    Sunday: 12:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-green-600/10 border border-green-600/20 rounded-xl hover:bg-green-600/15 transition-colors group"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-green-600/20">
                <MessageCircle size={18} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-100 group-hover:text-green-400 transition-colors">WhatsApp pe order karo</h3>
                <p className="text-sm text-charcoal-400">{BUSINESS.whatsapp}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
