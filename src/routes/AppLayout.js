import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { Button } from "primereact/button";

import { Divider } from "primereact/divider";
import { CartContext, CartContextProvider } from "../context/CartContext";

const AppLayout = () => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const { data, updateData } = useContext(CartContext);

  useEffect(() => {
    console.log(data);
    if (Object?.keys(data?.addedToCart)?.length !== 0) {
      setCartItems(data?.addedToCart);
    } else {
      setCartItems({ 1: { name: "No Products Added" } });
    }
  }, [data]);

  return (
    <div>
      <div className="header-container">
        <Header showDrawer={() => setVisible(!visible)} />
      </div>
      <Outlet />
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        style={{
          backgroundColor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          padding: "20px",
        }}
        dismissable={false}
      >
        <div style={{ backgroundColor: "white", position: "relative" }}>
          <h2>My Orders</h2>
          <Divider />
        </div>

        <div className="ordered-items">
          {Object.keys(cartItems)?.map((item) => {
            console.log(cartItems[item]?.title);
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

        <Button
          style={{
            width: "100%",
            textAlign: "center",
            padding: "10px 20px 10px 20px",
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "small",
            border: "none",
            borderRadius: "10px",
            textTransform: "uppercase",
          }}
        >
          Checkout
        </Button>

        <div style={{ position: "absolute", bottom: "0", width: "90%" }}>
          <p
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <div style={{ margin: "10px 0" }}>
              Total:{" "}
              <span style={{ position: "absolute", right: "0" }}>
                ${data?.totalAmount}
              </span>
            </div>
          </p>
        </div>
      </Sidebar>
    </div>
  );
};

export default AppLayout;
