import { createSelector } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { IncidentState } from "../state/incident.state";

const selectIncidents = (state: AppState) => state.incidents;
export const selectIncidentList = createSelector(
  selectIncidents,
  (state: IncidentState) => state.incidents,
);
export const selectSelectedIncident = createSelector(
  selectIncidents,
  (state: IncidentState) => state.selectedIncident,
);
export const getCountIncident = createSelector(
  selectIncidents,
  (state: IncidentState) => state.count,
);
