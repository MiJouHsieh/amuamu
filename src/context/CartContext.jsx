import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    let isNew = false;
    setCart((prevCart) => {
      const exists = prevCart.some((cartItem) => cartItem.id === item.id);
      if (!exists) {
        isNew = true;
        return [...prevCart, { ...item, checked: false }];
      }
      return prevCart;
    });
    return isNew;
  };

  const toggleChecked = (ingredientId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === ingredientId ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const checkedCount = () => {
    return cart.filter((item) => item.checked).length;
  };

  const removeFromCart = (ingredientId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== ingredientId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, toggleChecked, checkedCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
