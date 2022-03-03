import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Headers from "./components/layout/Headers";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Headers />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
