import { Divider } from "primereact/divider";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const OrderSummary = () => {
  const { data, updateData } = useContext(CartContext);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    console.log(data);
    if (Object?.keys(data?.addedToCart)?.length !== 0) {
      setCartItems(data?.addedToCart);
    } else {
      setCartItems({ na: { name: "No Products Added" } });
    }
  }, [data]);

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h3> Order summary</h3>
      <Divider />
      <div
        className="ordered-items"
        style={{ width: "80%", margin: "20px auto", padding: "20px" }}
      >
        {Object.keys(cartItems)?.map((item) => {
          console.log(cartItems[item]?.title);
          if (item !== "na")
            return (
              <div style={{ margin: "10px 0" }}>
                <div
                  style={{
                    padding: "20px 0 20px 0",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div>
                    <img
                      src={cartItems[item]?.images?.[0]}
                      width={80}
                      height={80}
                      style={{ margin: "10px", borderRadius: "10px" }}
                    />
                  </div>
                  <p style={{ fontSize: "smaller", width: "50%" }}>
                    {" "}
                    {cartItems[item]?.title}
                  </p>
                  <p style={{ position: "absolute", right: "10px" }}>
                    {cartItems[item]?.price}
                  </p>
                </div>
                <Divider />
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default OrderSummary;
