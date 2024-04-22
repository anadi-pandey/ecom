import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./routes/AppLayout";
import Home from "./components/Home";
import Electronics from "./components/Electronics";
import Clothes from "./components/Clothes";
import Toys from "./components/Toys";
import Furnitures from "./components/Furnitures";
import React, { useState, useEffect } from "react";
import { CartContextProvider } from "./context/CartContext";
import OrderSummary from "./components/OrderSummary";

function App() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error2, setError2] = useState(null);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError2("Error fetching data. Please try again later.");
      } finally {
        setLoading2(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<Home products={products} />} />
              <Route path="home" element={<Home products={products} />} />
              <Route
                path="electronics"
                element={
                  <Electronics categories={categories} name="Electronics" />
                }
              />
              <Route
                path="clothes"
                element={<Clothes categories={categories} name="Clothes" />}
              />
              <Route
                path="toys"
                element={<Toys categories={categories} name="Toys" />}
              />
              <Route
                path="furnitures"
                element={
                  <Furnitures categories={categories} name="Furniture" />
                }
              />

              <Route
                path="order-summary"
                element={
                  <OrderSummary categories={categories} name="Furniture" />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
