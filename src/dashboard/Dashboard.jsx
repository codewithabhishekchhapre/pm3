import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">HR Dashboard</h1>
        <nav className="space-y-4 flex flex-col pl-3">
          <Link to="/dashboard/jobpost">Jobpost</Link>
          <Link to="/dashboard/attendance">attendance</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="w-full">

      <Outlet/>
      </div>
      
    </div>
  );
};

// Reusable Card Component


export default Dashboard;
