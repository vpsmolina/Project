import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { toArray } from "rxjs/operators";
import { Incident } from "../data/incident";
import { IncidentsList } from "../data/incidents-list";
import { User } from "../data/user";
import { UsersList } from "../data/users-list";
import { IncidentData } from "../incidents/incident-data";
import { DataService } from "./data.service";

@Injectable({
  providedIn: DataService})

export class IncidentTable implements IncidentData {
  private _incidents: Incident[] = IncidentsList;
  private _incident: Incident;
  private _users: User[] = UsersList;

  public getIncidents(): Observable<Incident[]> {
    return of(this._incidents);
  }

  public createIncident(data: Incident): Observable<Incident> {
    return of(data);
  }

  public getCountIncidents(): Observable<Number> {
    return of(this._incidents.length);
  }

  public getIncidentById(_id: string): Observable<Incident[]> {
    this._incident = this._incidents.find(incident => incident._id === _id);
    return of(this._incident).pipe(toArray());
  }

  public updateIncident(_id: string, data: Incident): Observable<Incident> {
    this._incidents.forEach(incident => {
      if (incident._id === _id) {
        incident.name = data.name;
        incident.area = data.area;
        incident.assignee = data.assignee;
        incident.startDate = data.startDate;
        incident.dueDate = data.dueDate;
        incident.status = data.status;
      }
    });
    return of(this._incident);
  }
  public getUsers(): Observable<User[]> {
    return of(this._users);
  }
  public createUser(data: User): Observable<User> {
    return of(data);
  }

  public getCountUsers(): Observable<Number> {
    return of(this._users.length);
  }
}
