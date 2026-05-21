import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import AccessLogs from "../pages/AccessLogs.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import DivisionManagerPage from "../pages/DivisionManagerPage.jsx";
import EmployeePage from "../pages/EmployeePage.jsx";
import Employees from "../pages/Employees.jsx";
import HrPage from "../pages/HrPage.jsx";
import Login from "../pages/Login.jsx";
import Managers from "../pages/Managers.jsx";
import OperatorPage from "../pages/OperatorPage.jsx";
import Reports from "../pages/Reports.jsx";
import { getDefaultRouteForRole, hasRole, ROLES } from "../config/permissions.js";

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Navbar />
        <div className="page-container">{children}</div>
      </main>
    </div>
  );
}

function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !hasRole(user, allowedRoles)) {
    return <Navigate to={getDefaultRouteForRole(user?.role)} replace />;
  }

  return <AppShell>{children}</AppShell>;
}

function RoleRedirect() {
  const { user } = useAuth();
  return <Navigate to={getDefaultRouteForRole(user?.role)} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr"
        element={
          <ProtectedRoute allowedRoles={[ROLES.HR]}>
            <HrPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/division-manager"
        element={
          <ProtectedRoute allowedRoles={[ROLES.DIVISION_MANAGER]}>
            <DivisionManagerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/operator"
        element={
          <ProtectedRoute allowedRoles={[ROLES.OPERATOR]}>
            <OperatorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}>
            <EmployeePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.DIVISION_MANAGER, ROLES.OPERATOR, ROLES.EMPLOYEE]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.HR, ROLES.DIVISION_MANAGER, ROLES.OPERATOR, ROLES.EMPLOYEE]}>
            <Employees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/managers"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.HR]}>
            <Managers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/access-logs"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.DIVISION_MANAGER, ROLES.OPERATOR, ROLES.EMPLOYEE]}>
            <AccessLogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.HR, ROLES.DIVISION_MANAGER, ROLES.OPERATOR, ROLES.EMPLOYEE]}>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RoleRedirect />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
