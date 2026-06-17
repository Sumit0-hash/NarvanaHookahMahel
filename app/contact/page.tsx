'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react';
import { BUSINESS, WHATSAPP_URL } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="container-luxury section-padding">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-500/70 mb-2">Get In Touch</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-50 mb-4">
          Contact <span className="gold-gradient-text">Us</span>
        </h1>
        <p className="text-sm text-charcoal-400 max-w-lg mx-auto">
          Koi bhi sawal ho, product query ho, ya order related help chahiye &mdash; humse baat karo!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          {/* Address */}
          <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20">
                <MapPin size={18} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-100 mb-1">Visit Our Store</h3>
                <p className="text-sm text-charcoal-400 leading-relaxed">
                  {BUSINESS.address.street}<br />
                  {BUSINESS.address.area}, {BUSINESS.address.landmark}<br />
                  {BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20">
                <Phone size={18} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-100 mb-1">Call Us</h3>
                <a href={`tel:${BUSINESS.phone}`} className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
                  {BUSINESS.phone}
                </a>
                <p className="text-xs text-charcoal-500 mt-1">Available during business hours</p>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-green-600/10 border border-green-600/20 rounded-xl hover:bg-green-600/15 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-green-600/20">
                <MessageCircle size={18} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-100 group-hover:text-green-400 transition-colors mb-1">WhatsApp</h3>
                <p className="text-sm text-green-400">{BUSINESS.whatsapp}</p>
                <p className="text-xs text-charcoal-500 mt-1">Fastest way to reach us!</p>
              </div>
            </div>
          </a>

          {/* Email */}
          <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20">
                <Mail size={18} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-100 mb-1">Email</h3>
                <a href={`mailto:${BUSINESS.email}`} className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="p-6 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gold-500/10 border border-gold-500/20">
                <Clock size={18} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal-100 mb-1">Working Hours</h3>
                <p className="text-sm text-charcoal-400 leading-relaxed">
                  Mon - Sat: 11:00 AM - 10:00 PM<br />
                  Sunday: 12:00 PM - 9:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative aspect-video bg-charcoal-800 rounded-xl border border-charcoal-700/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="mx-auto text-gold-500/40 mb-2" />
                <p className="text-sm text-charcoal-400">Map - Panchkula Shopping Complex</p>
                <p className="text-xs text-charcoal-500 mt-1">Dhakoli, Zirakpur</p>
              </div>
            </div>
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(rgba(212,168,71,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,71,0.5) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="p-6 md:p-8 bg-charcoal-800 border border-charcoal-700/30 rounded-xl">
            <h2 className="text-xl font-display font-semibold text-charcoal-100 mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-600/20 mb-4">
                  <Send size={24} className="text-green-400" />
                </div>
                <p className="text-lg font-semibold text-charcoal-100 mb-1">Message Sent!</p>
                <p className="text-sm text-charcoal-400">Hum jaldi se jaldi reply karenge. Thank you!</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 text-sm text-gold-500 hover:text-gold-400 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal-200 mb-1.5">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-charcoal-700 border border-charcoal-600 rounded-lg px-4 py-2.5 text-sm text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-colors"
                    placeholder="Aapka naam"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal-200 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-charcoal-700 border border-charcoal-600 rounded-lg px-4 py-2.5 text-sm text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal-200 mb-1.5">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-charcoal-700 border border-charcoal-600 rounded-lg px-4 py-2.5 text-sm text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal-200 mb-1.5">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-charcoal-700 border border-charcoal-600 rounded-lg px-4 py-2.5 text-sm text-charcoal-100 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="product-query">Product Query</option>
                    <option value="order-help">Order Help</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal-200 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-charcoal-700 border border-charcoal-600 rounded-lg px-4 py-2.5 text-sm text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-colors resize-none"
                    placeholder="Aapka message yahan likhein..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-charcoal-900/30 border-t-charcoal-900 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
