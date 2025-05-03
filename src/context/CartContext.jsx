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

  const addToCart = (itemName) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.name === itemName)) return prevCart;
      return [...prevCart, { name: itemName, checked: false }];
    });
  };

  const toggleChecked = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.name === itemName ? { ...item, checked: !item.checked } : item)),
    );
  };

  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toggleChecked }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
