import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

// Define the Root component to handle the initial redirect
const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;