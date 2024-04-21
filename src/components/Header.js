import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ showDrawer }) => {
  // JSX -> Syntax to write HTML in JS
  const navigate = useNavigate();
  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "40%",
          justifyContent: "space-evenly",
        }}
        className="left-container-header"
      >
        <div className="logo-container">
          <p
            style={{ fontSize: "large", fontWeight: "600" }}
            className="nav-item"
            onClick={() => navigate("/")}
          >
            Shopi
          </p>
        </div>
        <div className="nav-item" onClick={() => navigate("/")}>
          All
        </div>
        <div className="nav-item" onClick={() => navigate("/clothes")}>
          Clothes
        </div>
        <div className="nav-item" onClick={() => navigate("/electronics")}>
          Electronics
        </div>
        <div className="nav-item" onClick={() => navigate("/furnitures")}>
          Furnitures
        </div>
        <div className="nav-item" onClick={() => navigate("/toys")}>
          Toys
        </div>
      </div>
      <div
        className="right-container-header"
        style={{
          display: "flex",
          alignItems: "center",
          width: "30%",
          justifyContent: "space-evenly",
        }}
      >
        <div>User Email</div>
        <div>My Orders</div>
        <div onClick={() => showDrawer()}>My Cart</div>
      </div>
    </div>
  );
};

export default Header;
