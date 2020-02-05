import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Incident } from "../data/incident";
import { IncidentsList } from "../data/incidents-list";
import { IncidentData } from "../incidents/incident-data";
import { DataService } from "./data.service";

@Injectable({
  providedIn: DataService})

export class IncidentTable implements IncidentData {
  private _incidents: Incident[] = IncidentsList;
  private _incident: Incident;
  getIncidents(): Observable<Incident[]> {
    return of(this._incidents);
  }

  createIncident(data: Incident): Observable<Incident> {
    return of(data);
  }

  getCountIncidents(): Observable<Number> {
    return of(this._incidents.length);
  }
}
