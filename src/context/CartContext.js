// MyContext.js
import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [data, setData] = useState({
    addedToCart: {},
    orderedItems: {},
  });

  const updateData = (newData, operation) => {
    console.log("Context Data");

    if (operation === "CART") {
      setData({
        addedToCart: { ...data?.addedToCart, [newData?.id]: newData },
        orderedItems: data?.orderedItems,
      });
    }
    // setData(newData);
  };

  return (
    <CartContext.Provider value={{ data, updateData }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
