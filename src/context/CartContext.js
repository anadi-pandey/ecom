// MyContext.js
import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [data, setData] = useState({
    addedToCart: {},
    orderedItems: {},
  });

  const getTotalAmount = () => {
    let amountTotal = 0;
    for (let key in data?.addedToCart) {
      amountTotal = amountTotal + data?.addedToCart[key]?.price;
      console.log(data?.addedToCart[key]?.price);
    }
    return amountTotal;
  };
  const updateData = (newData, operation) => {
    console.log("Context Data");

    if (operation === "CART") {
      setData({
        addedToCart: { ...data?.addedToCart, [newData?.id]: newData },
        orderedItems: data?.orderedItems,
        totalAmount: getTotalAmount(),
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
