import { AuthActions, EAuthActions } from "../actions/auth.actions";
import { AuthState, initialAuthState } from "../state/auth.state";

export function authReducers (state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case EAuthActions.AuthUserSuccess: {
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
        login: action.payload.login,
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
    case EAuthActions.GetDataUserSuccess: {
      return {
        ...state,
        user: {
          login: action.payload.login,
          surname: action.payload.surname,
        }
      };
    }
    default: {
      return state;
    }
  }
}
