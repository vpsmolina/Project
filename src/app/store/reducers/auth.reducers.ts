import { AuthActions, EAuthActions } from "../actions/auth.actions";
import { AuthState, initialAuthState } from "../state/auth.state";

export function authReducers (state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case EAuthActions.AuthUserSuccess: {
      return {
        ...state,
        token: action.payload.token,
        login: action.payload.login,
        isLogged: true
      };
    }

    case EAuthActions.UserLogOut: {
      return {
        ...state,
        user: null,
        isLogged: false,
        token: null
      };
    }
    default: {
      return state;
    }
  }
}
