import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Headers from "./components/layout/Headers";

function App() {
  return (
    <Router>
      <div className="App">
        <Headers />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
