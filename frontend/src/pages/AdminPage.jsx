import RoleOverview from "../components/RoleOverview.jsx";
import { ROLES } from "../config/permissions.js";

export default function AdminPage() {
  return <RoleOverview role={ROLES.ADMIN} />;
}
