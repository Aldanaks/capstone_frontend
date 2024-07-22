import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  console.log(cartItems);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item._id === product._id);

    if (existingProduct) {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item._id === product._id
                    ? { ...item, cartCount: item.cartCount + 1 }
                    : item
            )
        );
    } else {
        setCartItems((prevItems) => [...prevItems, { ...product, cartCount: 1 }]);
    }
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (product) => {
    let countChange = 0;

    const updatedCartItems = cartItems.map(item => {
      if (item._id === product._id) {
        if (item.cartCount > 1) {
          countChange = -1;
          return { ...item, cartCount: item.cartCount - 1 };
        } else {
          countChange = -1;
          return null;
        }
      }
      return item;
    }).filter(item => item !== null);
    // Apply state updates
    setCartItems(updatedCartItems);
    setCartCount(prevCount => prevCount + countChange);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.cartCount, 0);
  };

  return (
    <UserContext.Provider value={{ user, setUser, cartItems, cartCount, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
