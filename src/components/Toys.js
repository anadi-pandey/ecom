import React, { useEffect, useState } from "react";

const Toys = ({ categories, name }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState("");

  const getCategoryId = async (name) => {
    console.log(categories);
    categories?.map((category) => {
      console.log(name, category?.name?.toLowerCase());
      if (category?.name?.toLowerCase() === name?.toLowerCase()) {
        console.log(category?.id);
        setCategoryId(category?.id);
      } else {
        setCategoryId(null);
      }
    });
  };

  useEffect(() => {
    console.log(name, categoryId);
    if (categoryId !== null && categoryId !== "") {
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
    } else {
      setProducts([]);
    }
  }, [categoryId]);

  useEffect(() => {
    getCategoryId(name);
  }, []);

  return (
    <div>
      {" "}
      {products?.map((product) => (
        <div>{product?.title}</div>
      ))}
      {products?.length === 0 && (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Products Available for this Category
        </div>
      )}
    </div>
  );
};

export default Toys;
