import { IncidentsList } from "../../data/incidents-list";
import { Incident } from "../../models/incident";

export interface IncidentState {
  incidents: Incident[];
  selectedIncident: Incident;
  count: number;
}

export const initialIncidentState: IncidentState = {
  incidents: IncidentsList,
  selectedIncident: null,
  count: null,
};
