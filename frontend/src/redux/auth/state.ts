export interface AuthState {
  user: UserPort | null;
  token: string | null;
  // bool : 有冇登入, null: 未知login咗未
  isAuthenticated: boolean | null; // ternary bool
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: null,
};

export type UserPort = {
  id: number;
  username: string;
  user_type: "normal" | "kol" | "admin";
  avatar: string;
  introduction: string;
  birthday: string;
  gender: "M" | "F";
  email: string;
};
