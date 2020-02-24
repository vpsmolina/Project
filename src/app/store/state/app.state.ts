import { RouterReducerState } from "@ngrx/router-store";
import { AuthState, initialAuthState } from "./auth.state";
import { IncidentState, initialIncidentState } from "./incident.state";
import { initialUserState, UserState } from "./user.state";

export interface AppState {
  router?: RouterReducerState;
  incidents: IncidentState;
  users: UserState;
  auth: AuthState;
}

export const initialAppState: AppState = {
  incidents: initialIncidentState,
  users: initialUserState,
  auth: initialAuthState
};

export function getInitialState(): AppState {
  return initialAppState;
}
