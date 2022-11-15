import { AuthActions } from "./actions";
import { AuthState, initialState } from "./state";

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case "@@auth/LOGIN":
      return {
        ...state,
        user: action.user,
        token: action.token,
        isAuthenticated: true,
      };
    case "@@auth/LOGOUT":
      return {
        // why not false here??
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
