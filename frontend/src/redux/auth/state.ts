export interface AuthState {
  user: { id: string } | null;
  token: string | null;
  // bool : 有冇登入, null: 未知login咗未
  isAuthenticated: boolean | null; // ternary bool
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: null,
};
