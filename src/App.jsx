import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <AuthProvider> {/* ✅ Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
