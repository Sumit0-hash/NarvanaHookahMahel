import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { BUSINESS, NAV_LINKS, CATEGORIES, WHATSAPP_URL } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-700/30">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-charcoal-400 leading-relaxed">
              Narwana Hookah Mahal mein aapka swagat hai. Premium hookahs, exotic flavours,
              aur top-quality accessories - sab kuch ek jagah par.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600/10 border border-green-600/20 rounded-lg text-green-400 text-sm hover:bg-green-600/20 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp pe chat karo
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-400 hover:text-gold-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.handle}>
                  <Link
                    href={`/categories/${cat.handle}`}
                    className="text-sm text-charcoal-400 hover:text-gold-500 transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-charcoal-400">
                  {BUSINESS.address.street}<br />
                  {BUSINESS.address.area}, {BUSINESS.address.landmark}<br />
                  {BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-500 flex-shrink-0" />
                <a href={`tel:${BUSINESS.phone}`} className="text-sm text-charcoal-400 hover:text-gold-500 transition-colors">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-500 flex-shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="text-sm text-charcoal-400 hover:text-gold-500 transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-500">
            &copy; {new Date().getFullYear()} Narwana Hookah Mahal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-charcoal-500 hover:text-charcoal-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-charcoal-500 hover:text-charcoal-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
