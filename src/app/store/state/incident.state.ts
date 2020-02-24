import { Incident } from "../../models/incident";

export interface IncidentState {
  incidents: Incident[];
  selectedIncident: Incident;
  count: number;
}

export const initialIncidentState: IncidentState = {
  incidents: null,
  selectedIncident: null,
  count: null,
};
