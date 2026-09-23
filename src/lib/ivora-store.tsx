import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductBySlug, products, type Product } from "@/lib/ivora-data";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

export type Order = {
  id: string;
  customer: { name: string; email: string; phone: string };
  address: { address: string; city: string; postalCode: string; country: string };
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
  status: "CONFIRMED";
};

type MiniCartProduct = Pick<Product, "name" | "images">;

type IvoraStore = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  miniCart: MiniCartProduct | null;
  dismissMiniCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  addManyToCart: (items: { product: Product; size?: string; color?: string; quantity?: number }[]) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  removeWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  moveWishlistToCart: (product: Product) => void;
  createOrder: (order: Omit<Order, "id" | "date" | "status">) => Order;
  findOrder: (id: string) => Order | undefined;
  cartSubtotal: number;
  shipping: number;
  cartTotal: number;
  cartCount: number;
};

const StoreContext = createContext<IvoraStore | null>(null);

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function IvoraProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLocal<CartItem[]>("ivora-cart", []));
    setWishlist(readLocal<string[]>("ivora-wishlist", []));
    setOrders(readLocal<Order[]>("ivora-orders", []));
    setHydrated(true);
  }, []);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [miniCart, setMiniCart] = useState<MiniCartProduct | null>(null);

  useEffect(() => {
    if (hydrated) writeLocal("ivora-cart", cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) writeLocal("ivora-wishlist", wishlist);
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) writeLocal("ivora-orders", orders);
  }, [orders, hydrated]);

  const addToCart = useCallback((product: Product, size?: string, color?: string, quantity = 1) => {
    const selectedSize = size ?? product.sizes[0] ?? "ONE SIZE";
    const selectedColor = color ?? product.colors[0] ?? "Ivory";
    setCart((current) => {
      const exists = current.find(
        (item) => item.productId === product.id && item.size === selectedSize && item.color === selectedColor,
      );
      if (exists) {
        return current.map((item) =>
          item.productId === product.id && item.size === selectedSize && item.color === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId: product.id, size: selectedSize, color: selectedColor, quantity }];
    });
    setMiniCart({ name: product.name, images: product.images });
  }, []);

  const addManyToCart = useCallback(
    (items: { product: Product; size?: string; color?: string; quantity?: number }[]) => {
      items.forEach((item) => addToCart(item.product, item.size, item.color, item.quantity));
      if (items[0]) setCartOpen(true);
    },
    [addToCart],
  );

  const updateQuantity = useCallback((productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((item) => !(item.productId === productId && item.size === size && item.color === color)));
      return;
    }
    setCart((current) =>
      current.map((item) => (item.productId === productId && item.size === size && item.color === color ? { ...item, quantity } : item)),
    );
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setCart((current) => current.filter((item) => !(item.productId === productId && item.size === size && item.color === color)));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]));
  }, []);

  const removeWishlist = useCallback((productId: string) => setWishlist((current) => current.filter((id) => id !== productId)), []);

  const dismissMiniCart = useCallback(() => setMiniCart(null), []);

  const moveWishlistToCart = useCallback(
    (product: Product) => {
      addToCart(product);
      removeWishlist(product.id);
    },
    [addToCart, removeWishlist],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const createOrder = useCallback((orderInput: Omit<Order, "id" | "date" | "status">) => {
    const id = `IVR-${Math.floor(10000 + Math.random() * 89999)}`;
    const order: Order = { ...orderInput, id, date: new Date().toISOString(), status: "CONFIRMED" };
    setOrders((current) => [order, ...current]);
    setCart([]);
    setCartOpen(false);
    return order;
  }, []);

  const findOrder = useCallback((id: string) => orders.find((order) => order.id.toUpperCase() === id.toUpperCase()), [orders]);

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + (products.find((product) => product.id === item.productId)?.price ?? 0) * item.quantity, 0),
    [cart],
  );
  const shipping = cartSubtotal > 250 || cartSubtotal === 0 ? 0 : 12;
  const cartTotal = cartSubtotal + shipping;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo<IvoraStore>(
    () => ({
      cart,
      wishlist,
      orders,
      isCartOpen,
      isSearchOpen,
      miniCart,
      dismissMiniCart,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      addToCart,
      addManyToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      removeWishlist,
      isWishlisted: (productId: string) => wishlist.includes(productId),
      moveWishlistToCart,
      createOrder,
      findOrder,
      cartSubtotal,
      shipping,
      cartTotal,
      cartCount,
    }),
    [cart, wishlist, orders, isCartOpen, isSearchOpen, miniCart, dismissMiniCart, addToCart, addManyToCart, updateQuantity, removeFromCart, clearCart, toggleWishlist, removeWishlist, moveWishlistToCart, createOrder, findOrder, cartSubtotal, shipping, cartTotal, cartCount],
  );

  useEffect(() => {
    if (!miniCart) return;
    const timeout = window.setTimeout(() => setMiniCart(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [miniCart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useIvoraStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useIvoraStore must be used inside IvoraProvider");
  return store;
}

export function resolveCartItem(item: CartItem) {
  return getProductBySlug(products.find((product) => product.id === item.productId)?.slug ?? "");
}
