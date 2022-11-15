export function login(user: any, token: string) {
  return {
    type: "@@auth/LOGIN" as const,
    user,
    token,
  };
}

export function logout() {
  return {
    type: "@@auth/LOGOUT" as const,
  };
}

export type AuthActions = ReturnType<typeof login> | ReturnType<typeof logout>;
