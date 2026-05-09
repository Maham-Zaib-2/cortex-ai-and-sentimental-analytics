import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import AuthLayout from "@/pages/AuthLayout";
import Dashboard from "@/pages/Dashboard";
import Sentiment from "@/pages/Sentiment";
import Churn from "@/pages/Churn";
import Alerts from "@/pages/Alerts";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sentiment" element={<Sentiment />} />
        <Route path="/churn" element={<Churn />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}