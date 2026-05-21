import RoleOverview from "../components/RoleOverview.jsx";
import { ROLES } from "../config/permissions.js";

export default function OperatorPage() {
  return <RoleOverview role={ROLES.OPERATOR} />;
}
