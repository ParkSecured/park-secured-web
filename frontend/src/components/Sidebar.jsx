import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ROLES } from "../config/permissions.js";

const navItems = [
  { to: "/admin", label: "Admin", icon: "AD", roles: [ROLES.ADMIN] },
  { to: "/hr", label: "HR", icon: "HR", roles: [ROLES.HR] },
  { to: "/division-manager", label: "Divizie", icon: "M", roles: [ROLES.DIVISION_MANAGER] },
  { to: "/operator", label: "Operator", icon: "O", roles: [ROLES.OPERATOR] },
  { to: "/employee", label: "Employee", icon: "E", roles: [ROLES.EMPLOYEE] },
  { to: "/dashboard", label: "Dashboard", icon: "D", roles: [ROLES.ADMIN, ROLES.DIVISION_MANAGER, ROLES.OPERATOR, ROLES.EMPLOYEE] },
  { to: "/employees", label: "Angajati", icon: "A", roles: Object.values(ROLES) },
  { to: "/managers", label: "Manageri", icon: "MG", roles: [ROLES.ADMIN, ROLES.HR] },
  { to: "/access-logs", label: "Log acces", icon: "L", roles: [ROLES.ADMIN, ROLES.DIVISION_MANAGER, ROLES.OPERATOR, ROLES.EMPLOYEE] },
  { to: "/reports", label: "Rapoarte", icon: "R", roles: Object.values(ROLES) },
];

export default function Sidebar() {
  const { user } = useAuth();
  const visibleNavItems = navItems.filter((item) => item.roles.includes(user?.role));

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">PS</div>
        <div>
          <strong>ParkSecured</strong>
          <span>Access Control</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navigare principala">
        {visibleNavItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-link">
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-status">
        <span className="status-dot online" />
        Sistem sincronizat
      </div>
    </aside>
  );
}
