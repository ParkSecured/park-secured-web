import { useEffect, useMemo, useState } from "react";
import AccessLogTable from "../components/AccessLogTable.jsx";
import ClockCard from "../components/ClockCard.jsx";
import GateStatusCard from "../components/GateStatusCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { ROLES } from "../config/permissions.js";
import {
  getAccessLogs,
  getEmployees,
  getGateStatus,
  validateAccess,
} from "../services/api.js";

export default function Dashboard() {
  const { user } = useAuth();
  const [gateStatus, setGateStatus] = useState(null);
  const [logs, setLogs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [accessMessage, setAccessMessage] = useState("");

  const refreshDashboard = () => {
    getGateStatus().then(setGateStatus);
    getAccessLogs().then(setLogs);
    getEmployees().then(setEmployees);
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  const handleValidateAccess = async (accessCode) => {
    const result = await validateAccess({
      accessCode,
      direction: "IN",
      method: "Portar",
    });

    setAccessMessage(result.message || (result.authorized ? "Acces permis" : "Acces refuzat"));

    if (result.gateStatus) {
      setGateStatus(result.gateStatus);
    }

    if (result.log) {
      setLogs((currentLogs) => [result.log, ...currentLogs]);
    } else {
      getAccessLogs().then(setLogs);
    }
  };

  const latestLog = logs[0];
  const activeEmployee = useMemo(
    () => employees.find((employee) => employee.id === latestLog?.employeeId),
    [employees, latestLog],
  );
  const canOperateGate = [ROLES.ADMIN, ROLES.OPERATOR].includes(user?.role);

  return (
    <div className="page-grid">
      <section className="hero-band">
        <div>
          <p className="eyebrow">Dashboard poarta</p>
          <h2>Monitorizare intrari si iesiri in timp real</h2>
          <p>
            Starea portii, validarea accesului si ultimele evenimente sunt
            centralizate pentru operatorul de la poarta.
          </p>
        </div>
        <ClockCard />
      </section>

      <div className="dashboard-layout">
        <GateStatusCard status={gateStatus} />

        <section className="card employee-preview">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ultimul acces</p>
              <h2>{latestLog?.employeeName || "Fara evenimente"}</h2>
            </div>
            <span className={`badge ${latestLog?.status === "Valid" ? "success" : latestLog?.status === "Refuzat" ? "danger" : "info"}`}>
              {latestLog?.status || "Așteptare..."}
            </span>
        
          </div>
          <div className="profile-row">
            <span className="avatar xl">{latestLog?.employeeName?.slice(0, 1) || "?"}</span>
            <div>
              <span className="avatar xl">
                {latestLog?.employeeName ? latestLog.employeeName.slice(0, 1) : "?"}
              </span>
            </div>
          </div>
          {canOperateGate ? (
            <div className="action-row">
              <button
                className="primary-button"
                type="button"
                onClick={() => handleValidateAccess("1234")}
              >
                Permite acces
              </button>
              <button
                className="danger-button"
                type="button"
                onClick={() => handleValidateAccess("INVALID")}
              >
                Interzice manual
              </button>
            </div>
          ) : (
            <p className="muted-copy">Rolul curent are acces doar la monitorizare.</p>
          )}
          {accessMessage && <p className="inline-feedback">{accessMessage}</p>}
        </section>
      </div>

      <section className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Audit acces</p>
            <h2>Ultimele loguri</h2>
          </div>
          <span className="badge info">{logs.length} evenimente</span>
        </div>
        <AccessLogTable logs={logs.slice(0, 5)} />
      </section>
    </div>
  );
}
