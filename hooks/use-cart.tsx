'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';

interface CartItem {
  merchandiseId: string;
  quantity: number;
  title: string;
  price: string;
  image: string | null;
  handle: string;
  variantTitle: string;
  lineId?: string;
}

interface CartState {
  cartId: string | null;
  items: CartItem[];
  totalQuantity: number;
  totalAmount: string;
  checkoutUrl: string | null;
}

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  updateItemQuantity: (merchandiseId: string, quantity: number) => Promise<void>;
  removeItem: (merchandiseId: string) => Promise<void>;
  clearCart: () => void;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'narwana_cart_id';
const CART_ITEMS_KEY = 'narwana_cart_items';

function getStoredCartId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CART_ID_KEY);
}

function getStoredItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_ITEMS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
}

function storeCartId(id: string | null) {
  if (typeof window === 'undefined') return;
  if (id) {
    localStorage.setItem(CART_ID_KEY, id);
  } else {
    localStorage.removeItem(CART_ID_KEY);
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    const storedId = getStoredCartId();
    const storedItems = getStoredItems();


    setItems(storedItems);

    async function initCart() {
      try {

        if (storedId) {

          setCartId(storedId);

          const res = await fetch(
            `/api/cart/get?cartId=${encodeURIComponent(storedId)}`
          );

          const cart = await res.json();


          setCheckoutUrl(cart.checkoutUrl);

          return;
        }
        const res = await fetch('/api/cart/create');
        const cart = await res.json();

        setCartId(cart.id);
        setCheckoutUrl(cart.checkoutUrl);

        storeCartId(cart.id);
      } catch (err) {
        console.error("INIT CART ERROR:", err);
      }
    }

    initCart();
  }, []);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const addItem = useCallback(async (newItem: Omit<CartItem, 'lineId'>) => {
    setIsLoading(true);
    try {
      setItems((prev) => {
        const existing = prev.find((i) => i.merchandiseId === newItem.merchandiseId);
        if (existing) {
          const updated = prev.map((i) =>
            i.merchandiseId === newItem.merchandiseId
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
          storeItems(updated);
          return updated;
        }
        const updated = [...prev, { ...newItem, lineId: `local-${Date.now()}` }];
        storeItems(updated);
        return updated;
      });
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateItemQuantity = useCallback(async (merchandiseId: string, quantity: number) => {
    setIsLoading(true);
    try {
      setItems((prev) => {
        if (quantity <= 0) {
          const updated = prev.filter((i) => i.merchandiseId !== merchandiseId);
          storeItems(updated);
          return updated;
        }
        const updated = prev.map((i) =>
          i.merchandiseId === merchandiseId ? { ...i, quantity } : i
        );
        storeItems(updated);
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (merchandiseId: string) => {
    setIsLoading(true);
    try {
      setItems((prev) => {
        const updated = prev.filter((i) => i.merchandiseId !== merchandiseId);
        storeItems(updated);
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCartId(null);
    storeItems([]);
    storeCartId(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        totalQuantity,
        totalAmount,
        checkoutUrl,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        isLoading,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
