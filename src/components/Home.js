import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const Home = ({ products }) => {
  const [visible, setVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});
  const { data, updateData } = useContext(CartContext);

  useEffect(() => {
    console.log("FROM_HOME", data);
  }, [data]);

  return (
    <>
      <div style={{ margin: "20px" }}>
        <InputText
          style={{
            height: "40px",
            width: "400px",
            padding: "30px",
            fontSize: "large",
          }}
          placeholder="Search a Product"
        />
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <div className="product-card" style={{ position: "relative" }}>
            <img
              src={product?.images[0]}
              height={200}
              width={224}
              style={{ borderRadius: "10px" }}
              onClick={() => {
                setActiveProduct(product);
                setVisible(true);
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{ width: "80%", textAlign: "left", fontSize: "medium" }}
              >
                {product?.title}
              </p>
              <p>${product?.price}</p>
            </div>
            <div
              style={{
                position: "absolute",
                top: "160px",
                left: "10px",
                backgroundColor: "#DDDBDB",
                padding: "2px 5px 2px 5px",
                borderRadius: "5px",
              }}
            >
              {product?.category?.name}
            </div>
            <div
              className="add-to-cart"
              onClick={() => updateData(product, "CART")}
            >
              +
            </div>
          </div>
        ))}
      </div>

      {/* Details Drawer */}
      <Sidebar
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
        position="right"
        style={{
          backgroundColor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          padding: "20px",
        }}
      >
        <div style={{ backgroundColor: "white", position: "relative" }}>
          <h2>Product Details</h2>
          <Divider />
          <h3>{activeProduct?.title}</h3>
          <div style={{ margin: "20px auto", textAlign: "center" }}>
            <img
              src={activeProduct?.images ? activeProduct?.images[0] : ""}
              height={200}
              width={224}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <h3>${activeProduct?.price}</h3>
          <Divider />

          <h4>{activeProduct?.description}</h4>
        </div>
      </Sidebar>
    </>
  );
};

export default Home;
