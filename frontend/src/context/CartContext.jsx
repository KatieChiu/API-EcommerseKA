import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createCart, getCartItems, addCartItem, updateCartItem, deleteCartItem } from '../api/client';

const CartContext = createContext(null);

const getSessionId = () => {
  let sessionId = localStorage.getItem('ekat_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('ekat_session_id', sessionId);
  }
  return sessionId;
};

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(localStorage.getItem('ekat_cart_id'));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshItems = useCallback(async (id) => {
    if (!id) return;
    const data = await getCartItems(id);
    setItems(data);
  }, []);

  useEffect(() => {
    const init = async () => {
      let id = cartId;
      if (!id) {
        const cart = await createCart(getSessionId());
        id = cart.id;
        setCartId(id);
        localStorage.setItem('ekat_cart_id', id);
      }
      await refreshItems(id);
    };
    init();
  }, []);

  const addItem = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      await addCartItem(cartId, productId, quantity);
      await refreshItems(cartId);
    } finally {
      setLoading(false);
    }
  };

  const changeQuantity = async (itemId, quantity) => {
    setLoading(true);
    try {
      await updateCartItem(itemId, quantity);
      await refreshItems(cartId);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    setLoading(true);
    try {
      await deleteCartItem(itemId);
      await refreshItems(cartId);
    } finally {
      setLoading(false);
    }
  };

  const clearLocalCart = () => {
    localStorage.removeItem('ekat_cart_id');
    setCartId(null);
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartId, items, loading, total, count, addItem, changeQuantity, removeItem, clearLocalCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);