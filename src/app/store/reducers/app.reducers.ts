import { Action, ActionReducer,  ActionReducerMap, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { AppState } from "../state/app.state";
import { incidentReducers } from "./incident.reducers";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<AppState, Action> = {
  incidents: incidentReducers,
  users: userReducers,
};
export function localStorageSyncReducer(reducer: ActionReducer<Action>): ActionReducer<Action> {
  return localStorageSync({keys: ["incidents", "users"], rehydrate: true})(reducer);
}
export const metaReducers: Array<MetaReducer<unknown, Action>> = [localStorageSyncReducer];
