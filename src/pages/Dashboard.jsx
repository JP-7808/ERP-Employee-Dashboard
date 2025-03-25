import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [performance, setPerformance] = useState({
    monthlyTarget: 0,
    quarterlyTarget: 0,
    yearlyTarget: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Logged-in user:", parsedUser);
      setLoggedInUser(parsedUser);
      fetchEmployeeId(parsedUser.id, token);
    } else {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const fetchEmployeeId = async (userId, token) => {
    try {
      console.log("Fetching employee ID for User ID:", userId);
      const response = await axios.get(
        `https://erp-r0hx.onrender.com/api/employee/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const empId = response.data.employeeId;
      console.log("Fetched Employee ID:", empId);
      setEmployeeId(empId);

      if (empId) {
        fetchEmployeePerformance(empId, token);
      }
    } catch (error) {
      console.error("Error fetching employee ID:", error);
    }
  };

  const fetchEmployeePerformance = async (empId, token) => {
    try {
      console.log("Fetching performance for Employee ID:", empId);
      const response = await axios.get(
        `https://erp-r0hx.onrender.com/api/employee/${empId}/performance`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("API Response:", response.data);
      setPerformance(response.data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white w-64 p-6 fixed inset-y-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ERP Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white md:hidden"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Logged-in User Details */}
        {loggedInUser && (
          <div className="bg-blue-900 p-4 rounded-lg mb-6">
            <p className="text-lg font-semibold">{loggedInUser.name}</p>
            <p className="text-sm">{loggedInUser.email}</p>
            <p className="text-sm capitalize">{loggedInUser.role}</p>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition mt-6"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-blue-900 md:hidden"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, {loggedInUser ? loggedInUser.name : "User"}!
          </h1>
        </header>

        <main className="p-6">
          {/* Employee Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Employee Details
            </h2>
            {loggedInUser && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-blue-700" />
                  <p className="text-gray-700">{loggedInUser.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-blue-700" />
                  <p className="text-gray-700">{loggedInUser.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBriefcase className="text-blue-700" />
                  <p className="text-gray-700">{loggedInUser.role}</p>
                </div>
              </div>
            )}
          </div>

          {/* Pending Targets Section */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Pending Targets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800">
                Monthly Targets
              </h3>
              <p className="text-2xl font-bold text-green-900">
                ${performance.monthlyTarget}
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800">
                Quarterly Targets
              </h3>
              <p className="text-2xl font-bold text-blue-900">
                ${performance.quarterlyTarget}
              </p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-yellow-800">
                Yearly Targets
              </h3>
              <p className="text-2xl font-bold text-yellow-900">
                ${performance.yearlyTarget}
              </p>
            </div>
          </div>

          {/* Total Sales Section */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Total Sales</h2>
          <div className="bg-purple-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-800">Sales</h3>
            <p className="text-2xl font-bold text-purple-900">
              ${performance.totalSales}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
