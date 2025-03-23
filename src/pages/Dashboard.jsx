import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaTachometerAlt,
  FaBullseye,
  FaTrophy,
  FaChartBar,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login after logout
  };

  // Dummy Data
  const employee = {
    id: "EMP001",
    name: "Thirteen",
    email: "thirteen@infratech.com",
    role: "Employee",
  };

  const performanceMetrics = {
    sales: "$12,000",
    leads: 45,
    conversions: 30,
  };

  const pendingTargets = [
    { type: "Monthly", value: "$10,000", deadline: "2024-03-31" },
    { type: "Quarterly", value: "$30,000", deadline: "2024-06-30" },
    { type: "Yearly", value: "$120,000", deadline: "2024-12-31" },
  ];

  const salesContests = [
    { name: "Spring Sales Blitz", prize: "$5,000", endDate: "2024-06-15" },
    { name: "Summer Challenge", prize: "$3,000", endDate: "2024-08-20" },
  ];

  const salesAchievements = {
    totalSales: "$120,000",
    incentives: "$5,000",
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
            <p className="text-lg  font-semibold">{loggedInUser.name}</p>
            <p className="text-sm ">{loggedInUser.email}</p>
            <p className="text-sm  capitalize">{loggedInUser.role}</p>
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
           {loggedInUser && ( <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div> )}
          </div>

          {/* Performance Metrics */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800">
                Total Sales
              </h3>
              <p className="text-2xl font-bold text-green-900">
                {performanceMetrics.sales}
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800">
                Leads Generated
              </h3>
              <p className="text-2xl font-bold text-blue-900">
                {performanceMetrics.leads}
              </p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-yellow-800">
                Conversions
              </h3>
              <p className="text-2xl font-bold text-yellow-900">
                {performanceMetrics.conversions}
              </p>
            </div>
          </div>

          {/* Sales Contests */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Running Sales Contests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salesContests.map((contest, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors"
              >
                <h3 className="text-lg font-semibold text-purple-800">
                  {contest.name}
                </h3>
                <p className="text-purple-700">Prize: {contest.prize}</p>
                <p className="text-purple-700">End Date: {contest.endDate}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
