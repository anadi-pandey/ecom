import React, { useEffect, useState } from "react";

const Furnitures = ({ categories, name }) => {
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
    <div>
      {" "}
      {products?.map((product) => (
        <div>{product?.title}</div>
      ))}
    </div>
  );
};

export default Furnitures;
