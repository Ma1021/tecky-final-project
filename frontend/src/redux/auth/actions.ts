import { UserPort } from "./state";

export function login(user: UserPort, token: string) {
  console.log("login actions");
  console.log({
    type: "@@auth/LOGIN" as const,
    user,
    token,
  });
  return {
    type: "@@auth/LOGIN" as const,
    user,
    token,
  };
}

export function registerAuth(user: UserPort, token: string) {
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
