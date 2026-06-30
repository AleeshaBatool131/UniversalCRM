import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Dashboard from "../pages/Dashboard.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Day 2+: customers, leads, employees, tasks, meetings, calendar,
          reports, notifications, settings, user profile */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
