import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Headers from "./components/layout/Headers";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

import {loadUser} from './actions/UserAction'
import store from './Store'
import Profile from "./components/user/Profile";

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      <div className="App">
        <Headers />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me/:id" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
