import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/category/category";
import Product from "./pages/product/product";
import "./App.css";
import Cart from "./pages/cart/cart";
import Index from "./pages/home";

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" exact element={<Index />}></Route>
          <Route path="/categories/:id" element={<Category />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="cart" element={<Cart />}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
