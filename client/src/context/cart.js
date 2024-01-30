import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loggedInUserId] = useAuth(); // Get the logged-in user's ID from the authentication context

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      // Check if the stored cart belongs to the logged-in user
      if (parsedCart._id === loggedInUserId) {
        setCart(parsedCart.items);
        localStorage.setItem('cart')
      } else {
        setCart([]); // Reset cart for a new user on the same device
        localStorage.removeItem('cart'); // Clear the cart for the previous user
      }
    }
  }, [loggedInUserId]);


  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
