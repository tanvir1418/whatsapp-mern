import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
