export const ROLES = {
  ADMIN: "admin",
  HR: "hr",
  DIVISION_MANAGER: "division_manager",
  OPERATOR: "operator",
  EMPLOYEE: "viewer",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.HR]: "HR",
  [ROLES.DIVISION_MANAGER]: "Manager divizie",
  [ROLES.OPERATOR]: "Operator",
  [ROLES.EMPLOYEE]: "Employee",
};

export const ROLE_HOME = {
  [ROLES.ADMIN]: "/admin",
  [ROLES.HR]: "/hr",
  [ROLES.DIVISION_MANAGER]: "/division-manager",
  [ROLES.OPERATOR]: "/operator",
  [ROLES.EMPLOYEE]: "/employee",
};

export const ROLE_CAPABILITIES = {
  [ROLES.ADMIN]: {
    title: "Control complet sistem",
    can: [
      "Creeaza, modifica si dezactiveaza utilizatori",
      "Creeaza, modifica si sterge/dezactiveaza angajati",
      "Administreaza divizii si configurari",
      "Vede rapoarte globale",
      "Poate rula actiuni de mentenanta",
    ],
    cannot: [],
  },
  [ROLES.HR]: {
    title: "Administrare personal",
    can: [
      "Creeaza conturi pentru division_manager, operator si employee",
      "Adauga si modifica datele angajatilor",
      "Asociaza angajati cu divizii",
      "Activeaza sau dezactiveaza accesul angajatilor",
      "Vede rapoarte de personal",
    ],
    cannot: [
      "Nu poate crea, modifica sau sterge admini",
      "Nu poate sterge definitiv date",
      "Nu poate accesa mentenanta/stocare",
      "Nu poate sterge evenimente de acces",
    ],
  },
  [ROLES.DIVISION_MANAGER]: {
    title: "Management divizie",
    can: [
      "Vede angajatii din divizia proprie",
      "Modifica angajatii din divizia proprie",
      "Vede rapoarte doar pentru divizia proprie",
    ],
    cannot: [
      "Nu poate vedea sau modifica alte divizii",
      "Nu poate administra utilizatori globali",
      "Nu poate sterge definitiv date",
    ],
  },
  [ROLES.OPERATOR]: {
    title: "Operare poarta",
    can: [
      "Vede angajati si loguri de acces",
      "Introduce si verifica evenimente de acces",
      "Monitorizeaza starea portii",
    ],
    cannot: [
      "Nu poate administra utilizatori",
      "Nu poate administra divizii",
      "Nu poate sterge definitiv date",
    ],
  },
  [ROLES.EMPLOYEE]: {
    title: "Acces doar citire",
    can: [
      "Vede dashboard-ul",
      "Vede angajati, loguri si rapoarte permise",
    ],
    cannot: [
      "Nu poate crea, modifica sau sterge date",
      "Nu poate introduce evenimente de acces",
      "Nu poate administra utilizatori sau divizii",
    ],
  },
};

export function getDefaultRouteForRole(role) {
  return ROLE_HOME[role] || "/employee";
}

export function hasRole(user, allowedRoles = []) {
  return Boolean(user?.role && allowedRoles.includes(user.role));
}
