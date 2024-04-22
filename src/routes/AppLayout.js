import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { Divider } from "primereact/divider";
import { CartContext, CartContextProvider } from "../context/CartContext";

const AppLayout = () => {
  const [visible, setVisible] = useState(false);
  const { data, updateData } = useContext(CartContext);

  useEffect(() => {
    console.log(data);
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
      >
        <div style={{ backgroundColor: "white", position: "relative" }}>
          <h2>My Orders</h2>
          <Divider />
        </div>
        <div style={{ position: "absolute", bottom: "0", width: "90%" }}>
          <p
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <Divider />
            <div className="ordered-items"></div>
            <div style={{ margin: "10px 0" }}>
              Total:{" "}
              <span style={{ position: "absolute", right: "0" }}>$0</span>
            </div>
          </p>
        </div>
      </Sidebar>
    </div>
  );
};

export default AppLayout;
