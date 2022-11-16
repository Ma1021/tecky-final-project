export function login(user: { id: string }, token: string) {
  return {
    type: "@@auth/LOGIN" as const,
    user,
    token,
  };
}

export function registerAuth(user: { id: string }, token: string) {
  return {
    type: "@@auth/REGISTER" as const,
    user,
    token,
  };
}

export function logout() {
  return {
    type: "@@auth/LOGOUT" as const,
  };
}

export type AuthActions =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof registerAuth>;
