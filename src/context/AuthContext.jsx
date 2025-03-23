import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login function (Pass `navigate` from Login.jsx)
  const login = async (email, password, navigate) => {
    try {
      console.log("📤 Trying Login API:", { email, password });

      const response = await axios.post("https://erp-r0hx.onrender.com/api/auth/login", {
        email,
        password,
      });

      console.log("✅ Login Successful:", response.data);

      const userData = response.data.user;
      const token = response.data.token;

      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userData.id);

      // ✅ Redirect to Dashboard
      
    } catch (error) {
      console.error("❌ Login Failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  // ✅ Signup function (Pass `navigate` from Signup.jsx)
  const signup = async (name, email, password, role, navigate) => {
    try {
      console.log("📤 Sending Signup Request:", { name, email, password, role });

      const response = await axios.post("https://erp-r0hx.onrender.com/api/auth/register", {
        name, // ✅ API expects `name`, not `fullName`
        email,
        password,
        role: role.toLowerCase(), // ✅ Ensure lowercase role
      });

      console.log("✅ Signup Successful:", response.data);

      const userData = response.data.user;
      const token = response.data.token;

      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userData.id);

      // ✅ Redirect to Login after signup
      alert("Signup successful! Please log in.");
     
    } catch (error) {
      console.error("❌ Signup Failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Signup failed. Please check your details.");
    }
  };

  // ✅ Logout function (Pass `navigate` from components)
  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    // ✅ Redirect to login after logout
   
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
