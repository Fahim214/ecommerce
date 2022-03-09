import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Headers from "./components/layout/Headers";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/UserAction";
import store from "./Store";
import Profile from "./components/user/Profile";
import ProductCart from "./components/product/ProductCart";
import Product from "./components/product/Product";
import Shipping from "./components/product/Shipping";
import ConfirmOrder from "./components/product/ConfirmOrder";
import axios from "axios";
import OrderSuccess from "./components/product/OrderSuccess";

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  // const { isAuthenticated, loading, user } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Headers />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me/:id" element={<Profile />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
