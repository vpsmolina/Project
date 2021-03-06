import { Observable } from "rxjs";
import { Incident } from "./incident";
import { User } from "./user";

export interface IncidentData {
  getIncidents(): Observable<Incident[]>;
  getIncidentById(_id: string): Observable<Incident[]>;
  createIncident(data: Incident): Observable<Incident>;
  getCountIncidents(): Observable<Number>;
  updateIncident(_id: string, data: Incident ): Observable<Incident>;
  getUsers(): Observable<User[]>;
  createUser(data: User): Observable<User>;
  getCountUsers(): Observable<Number>;
  deleteUser(_id: string): Observable<string>;
}
