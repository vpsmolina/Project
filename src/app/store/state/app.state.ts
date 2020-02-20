import { RouterReducerState } from "@ngrx/router-store";
import { IncidentState, initialIncidentState } from "./incident.state";
import { initialUserState, UserState } from "./user.state";

export interface AppState {
  router?: RouterReducerState;
  incidents: IncidentState;
  users: UserState;
}

export const initialAppState: AppState = {
  incidents: initialIncidentState,
  users: initialUserState
};

export function getInitialState(): AppState {
  return initialAppState;
}
