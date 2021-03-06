import { AuthActions, EAuthActions } from "../actions/auth.actions";
import { AuthState, initialAuthState } from "../state/auth.state";

export function authReducers (state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case EAuthActions.AuthUserSuccess: {
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
        login: action.payload.user.login,
        user: action.payload.user
      };
    }
    case EAuthActions.UserLogOut: {
      return {
        ...state,
        login: null,
        isLogged: false,
        token: null
      };
    }
    case EAuthActions.GetDataUserSuccess: {
      return {
        ...state,
        user: action.payload.user,
        login: action.payload.user.login,
        token: action.payload.token,
/*        user: {
          login: action.payload.login,
          surname: action.payload.surname,
          position: action.payload.position,
          password: action.payload.password,
          birthday: action.payload.birthday,
        }*/
      };
    }
    default: {
      return state;
    }
  }
}
