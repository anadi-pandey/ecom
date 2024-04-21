import React from "react";

const Home = ({ products }) => {
  return (
    <div>
      {products?.map((product) => (
        <div>{product?.title}</div>
      ))}
    </div>
  );
};

export default Home;
