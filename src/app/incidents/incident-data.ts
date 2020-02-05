import { Observable } from "rxjs";
import { Incident } from "../data/incident";

export interface IncidentData {
  getIncidents(): Observable<Incident[]>;
  createIncident(data: Incident): Observable<Incident>;
  getCountIncidents(): Observable<Number>;
}
