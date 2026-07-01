import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CustomerList from "../pages/Customers/CustomerList.jsx";
import AddCustomer from "../pages/Customers/AddCustomer.jsx";
import CustomerProfile from "../pages/Customers/CustomerProfile.jsx";
import LeadManagement from "../pages/Leads/LeadManagement.jsx";
import AddLead from "../pages/Leads/AddLead.jsx";
import EmployeeList from "../pages/Employees/EmployeeList.jsx";
import EmployeeProfile from "../pages/Employees/EmployeeProfile.jsx";
import TaskList from "../pages/Tasks/TaskList.jsx";
import CreateTask from "../pages/Tasks/CreateTask.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/add" element={<AddCustomer />} />
      <Route path="/customers/:id" element={<CustomerProfile />} />

      <Route path="/leads" element={<LeadManagement />} />
      <Route path="/leads/add" element={<AddLead />} />

      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/:id" element={<EmployeeProfile />} />

      <Route path="/tasks" element={<TaskList />} />
      <Route path="/tasks/create" element={<CreateTask />} />

      {/* Day 4+: meetings, calendar, reports, notifications, settings */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
