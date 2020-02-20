import { Action } from "@ngrx/store";
import { Incident } from "../../models/incident";

export enum EIncidentActions {
  GetIncidents = "[Incidents List] Get incidents",
  GetIncidentsSuccess = "[Incidents List] Get incidents success",
  GetIncident = "[Incidents] Get incident",
  GetIncidentSuccess = "[Incidents] Get incident success",
  CreateIncident = "[Create/Edit Incident] Create incidents",
  CreateIncidentsSuccess = "[Create/Edit Incident] Create incidents success",
  UpdateIncident = "[Create/Edit Incident] Update incidents",
  UpdateIncidentSuccess = "[Create/Edit Incident] Update incidents success",
  GetCountIncidents = "[Incidents] Get count incidents",
}
export class GetIncidents implements Action {
  public readonly type = EIncidentActions.GetIncidents;
}

export class GetIncidentsSuccess implements Action {
  public readonly type = EIncidentActions.GetIncidentsSuccess;
  constructor(public payload: Incident[]) {
  }
}

export class GetIncident implements Action {
  public readonly type = EIncidentActions.GetIncident;
  constructor(public payload: string) {
  }
}

export class GetIncidentSuccess implements Action {
  public readonly type = EIncidentActions.GetIncidentSuccess;
  constructor(public payload: Incident) {
  }
}

export class CreateIncident implements Action {
  public readonly type = EIncidentActions.CreateIncident;
  constructor(public payload: Incident) {
  }
}

export class CreateIncidentSuccess implements Action {
  public readonly type = EIncidentActions.CreateIncidentsSuccess;
  constructor(public payload: Incident) {
  }
}

export class UpdateIncident implements Action {
  public readonly type = EIncidentActions.UpdateIncident;
  constructor(public payload: {_id: string, data: Incident}) {
  }
}

export class UpdateIncidentSuccess implements Action {
  public readonly type = EIncidentActions.UpdateIncidentSuccess;
  constructor(public payload: {_id: string, data: Incident}) {
  }
}
export type IncidentActions =
  GetIncidents | GetIncidentsSuccess |
  GetIncident | GetIncidentSuccess |
  CreateIncident | CreateIncidentSuccess |
  UpdateIncident | UpdateIncidentSuccess;
