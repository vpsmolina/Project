import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Incident } from "../models/incident";
import { User } from "../models/user";

@Injectable({
   providedIn: "root"})

export class TableService {
  public apiUri: string  = "http://localhost:3000";
  constructor(private http: HttpClient) {
  }
  public getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUri + "/event");
  }

  public createIncident(data: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.apiUri + "/event", data);
  }

  public updateIncident(_id: string, data: Incident): Observable<Incident> {
    return this.http.put<Incident>(this.apiUri + "/event/" + _id, data);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUri + "/account");
  }

  public createUser(data: User): Observable<User> {
    return this.http.post<User>(this.apiUri + "/account/", data);
  }

  public deleteUser(_id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUri}/account/${_id}`);
  }
  public updateUser(_id: string, data: User): Observable<User> {

    return this.http.put<User>(this.apiUri + "/account/" + _id, data);
  }
  public getUserById(_id: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUri + "/account/" + _id);
  }
}
