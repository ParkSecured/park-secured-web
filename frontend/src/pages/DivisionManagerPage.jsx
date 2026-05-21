import RoleOverview from "../components/RoleOverview.jsx";
import { ROLES } from "../config/permissions.js";

export default function DivisionManagerPage() {
  return <RoleOverview role={ROLES.DIVISION_MANAGER} />;
}
