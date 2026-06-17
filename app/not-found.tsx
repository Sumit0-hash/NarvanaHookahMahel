import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-luxury section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-8xl font-display font-bold gold-gradient-text mb-4">404</p>
      <h1 className="text-2xl font-display font-bold text-charcoal-100 mb-2">Page Not Found</h1>
      <p className="text-sm text-charcoal-400 mb-8">
        Yeh page exist nahi karta. Kya aap galti se yahan aa gaye?
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
