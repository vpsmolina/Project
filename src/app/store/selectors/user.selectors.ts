import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { AuthState } from "../state/auth.state";
import { UserState } from "../state/user.state";

const selectUsers = (state: AppState) => state.users;
const tokenUser = (state: AppState) => state.auth;
export const selectUserList = createSelector(
  selectUsers,
  (state: UserState) => state.users,
);
export const getCountUser = createSelector(
  selectUsers,
  (state: UserState) => state.count,
);
export const getAuthData = createSelector(
  tokenUser,
  (state: AuthState) => state,
);
export const getLoggedUser = createSelector(
  tokenUser,
  (state: AuthState) => state.isLogged,
);
