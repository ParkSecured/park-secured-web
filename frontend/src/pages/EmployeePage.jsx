import RoleOverview from "../components/RoleOverview.jsx";
import { ROLES } from "../config/permissions.js";

export default function EmployeePage() {
  return <RoleOverview role={ROLES.EMPLOYEE} />;
}
