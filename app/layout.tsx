import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { CartProvider } from '@/hooks/use-cart';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Premium Hookah Collection`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Premium Hookah Collection`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Premium Hookah Collection`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased`}>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
