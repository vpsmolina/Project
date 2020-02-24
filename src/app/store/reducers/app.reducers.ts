import { Action, ActionReducer,  ActionReducerMap, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { AppState } from "../state/app.state";
import { authReducers } from "./auth.reducers";
import { incidentReducers } from "./incident.reducers";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<AppState, Action> = {
  incidents: incidentReducers,
  users: userReducers,
  auth: authReducers
};
/*
export function localStorageSyncReducer(reducer: ActionReducer<Action>): ActionReducer<Action> {
  return localStorageSync({keys: ["incidents", "users", "login"], rehydrate: true})(reducer);
}
export const metaReducers: Array<MetaReducer<unknown, Action>> = [localStorageSyncReducer];
*/
