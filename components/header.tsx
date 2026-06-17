'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useCart } from '@/hooks/use-cart';
import { NAV_LINKS, CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalQuantity, setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-charcoal-900/95 backdrop-blur-md border-b border-gold-500/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-charcoal-200 hover:text-gold-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo size={isScrolled ? 'sm' : 'md'} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.label === 'Categories' ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsCategoriesOpen(true)}
                    onMouseLeave={() => setIsCategoriesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-2 text-sm text-charcoal-200 hover:text-gold-500 transition-colors font-medium"
                    >
                      {link.label}
                      <ChevronDown size={14} className={cn('transition-transform', isCategoriesOpen && 'rotate-180')} />
                    </Link>
                    {isCategoriesOpen && (
                      <div className="absolute top-full left-0 mt-0 w-56 bg-charcoal-800 border border-charcoal-700 rounded-lg shadow-xl shadow-black/40 py-2 animate-fade-in">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.handle}
                            href={`/categories/${cat.handle}`}
                            className="block px-4 py-2.5 text-sm text-charcoal-200 hover:text-gold-500 hover:bg-charcoal-700/50 transition-colors"
                          >
                            {cat.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm text-charcoal-200 hover:text-gold-500 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-charcoal-200 hover:text-gold-500 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-charcoal-200 hover:text-gold-500 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold-500 text-charcoal-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="border-t border-charcoal-700/50 bg-charcoal-900/95 backdrop-blur-md animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hookahs, flavours, accessories..."
                  className="w-full bg-charcoal-800 border border-charcoal-700 rounded-lg pl-11 pr-4 py-3 text-sm text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-colors"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-charcoal-900 border-r border-charcoal-700/50 animate-slide-in-right overflow-y-auto">
            <div className="p-4 border-b border-charcoal-700/50 flex items-center justify-between">
              <Logo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-charcoal-200 hover:text-gold-500"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="p-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-2 text-charcoal-200 hover:text-gold-500 transition-colors font-medium border-b border-charcoal-800/50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-charcoal-700/50">
                <p className="px-2 text-xs text-charcoal-500 uppercase tracking-wider mb-2">Categories</p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.handle}
                    href={`/categories/${cat.handle}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-2 text-sm text-charcoal-300 hover:text-gold-500 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
              <div className="mt-6 p-4 bg-charcoal-800 rounded-lg border border-charcoal-700/50">
                <p className="text-sm text-charcoal-200 font-medium">Need Help?</p>
                <p className="text-xs text-charcoal-400 mt-1">WhatsApp pe message karo</p>
                <a
                  href={`https://wa.me/919876543210`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-gold-500 hover:text-gold-400"
                >
                  +91 98765 43210
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
