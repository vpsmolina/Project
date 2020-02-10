import { Observable } from "rxjs";
import { Incident } from "../data/incident";
import { User } from "../data/user";

export interface IncidentData {
  getIncidents(): Observable<Incident[]>;
  getIncidentById(_id: string): Observable<Incident[]>;
  createIncident(data: Incident): Observable<Incident>;
  getCountIncidents(): Observable<Number>;
  updateIncident(_id: string, data: Incident ): Observable<Incident>;
  getUsers(): Observable<User[]>;
  createUser(data: User): Observable<User>;
  getCountUsers(): Observable<Number>;
}