import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { toArray } from "rxjs/operators";
import { IncidentsList } from "../data/incidents-list";
import { UsersList } from "../data/users-list";
import { Incident } from "../models/incident";
import { IncidentData } from "../models/incident-data";
import { User } from "../models/user";

@Injectable({
   providedIn: "root"})

export class TableService {
  private _incidents: Incident[] = IncidentsList;
  private _incident: Incident;
  private _users: User[] = UsersList;
  private _user: User;
  public apiUri: string  = "http://localhost:3000";
  constructor(private http: HttpClient) {
  }
  public getIncidents(): Observable<Incident[]> {
    /*return of(this._incidents);*/
    return this.http.get<Incident[]>(this.apiUri + "/event");
  }

  public createIncident(data: Incident): Observable<Incident> {
    /*return of(data);*/
    return this.http.post<Incident>(this.apiUri + "/event/createincident", data);
  }

/*  public getCountIncidents(): Observable<Number> {
    return of(this._incidents.length);
  }*/

  public getIncidentById(_id: string): Observable<Incident[]> {
/*    this._incident = this._incidents.find(incident => incident._id === _id);
    return of(this._incident).pipe(toArray());*/
    return this.http.get<Incident[]>(this.apiUri + "/event/read/" + _id);
  }

  public updateIncident(_id: string, data: Incident): Observable<Incident> {
/*    this._incidents.forEach(incident => {
      if (incident._id === _id) {
        incident.name = data.name;
        incident.area = data.area;
        incident.assignee = data.assignee;
        incident.startDate = data.startDate;
        incident.dueDate = data.dueDate;
        incident.status = data.status;
      }
    });
    return of(this._incident);*/
    return this.http.put<Incident>(this.apiUri + "/event/update/" + _id, data);
  }

  public getUsers(): Observable<User[]> {
    /*return of(this._users);*/
    return this.http.get<User[]>(this.apiUri + "/account");
  }

  public createUser(data: User): Observable<User> {
    /*return of(data);*/
    return this.http.post<User>(this.apiUri + "/account/createuser", data);
  }

  public getCountUsers(): Observable<Number> {
    return of(this._users.length);
  }

  public deleteUser(_id: string): Observable<string> {
/*    this._users = this._users.filter(user => user._id !== _id ? this._user = user : this._user = null);
    return of(this._user);*/
    return this.http.delete<string>(`${this.apiUri}/account/delete/${_id}`);
  }
}
