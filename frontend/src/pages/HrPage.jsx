import ClockCard from "../components/ClockCard.jsx";
import RoleOverview from "../components/RoleOverview.jsx";
import { ROLES } from "../config/permissions.js";

export default function HrPage() {
  return <RoleOverview actions={<ClockCard />} role={ROLES.HR} />;
}
