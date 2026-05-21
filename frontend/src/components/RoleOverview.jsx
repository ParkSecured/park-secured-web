import { ROLE_CAPABILITIES, ROLE_LABELS } from "../config/permissions.js";

export default function RoleOverview({
  actions,
  role,
  children,
  eyebrow = "Permisiuni rol",
}) {
  const capability = ROLE_CAPABILITIES[role];

  if (!capability) {
    return null;
  }

  return (
    <div className="page-grid">
      <section className="section-heading page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{ROLE_LABELS[role]}</h2>
        </div>
        {actions || <span className="badge info">{capability.title}</span>}
      </section>

      <section className="card permission-card">
        <p className="eyebrow">Permis</p>
        <ul className="permission-list">
          {capability.can.map((item) => (
            <li key={item}>
              <span className="status-dot online" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {children}
    </div>
  );
}
