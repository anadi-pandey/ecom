// MyContext.js
import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [data, setData] = useState({
    addedToCart: {},
    orderedItems: {},
  });

  const getTotalAmount = (list) => {
    console.log(list);
    let amountTotal = 0;
    Object?.keys(list)?.map((key) => {
      amountTotal = amountTotal + list[key]?.price;
    });
    return amountTotal;
  };

  const updateData = (newData, operation) => {
    console.log("Context Data");

    if (operation === "CART") {
      setData({
        addedToCart: { ...data?.addedToCart, [newData?.id]: newData },
        orderedItems: data?.orderedItems,
        totalAmount: getTotalAmount({
          ...data?.addedToCart,
          [newData?.id]: newData,
        }),
      });
    }
    if (operation === "ORDER") {
      setData({
        ...data,
        orderedItems: newData?.orderedItems,
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
