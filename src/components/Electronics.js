import React, { useContext, useEffect, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Divider } from "primereact/divider";
import { CartContext } from "../context/CartContext";

const Electronics = ({ categories, name }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const { data, updateData } = useContext(CartContext);

  const [visible, setVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});

  const getCategoryId = async (name) => {
    console.log(categories);
    categories?.map((category) => {
      console.log(name, category?.name?.toLowerCase());
      if (category?.name?.toLowerCase() === name?.toLowerCase()) {
        console.log(category?.id);
        setCategoryId(category?.id);
      }
    });
  };

  useEffect(() => {
    console.log(name, categoryId);
    if (categoryId !== "") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [categoryId]);

  useEffect(() => {
    getCategoryId(name);
  }, []);

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
              Electronics
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

export default Electronics;
