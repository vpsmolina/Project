import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Incident } from "../../models/incident";
import { IncidentTable } from "../../services/incident-table.service";
import { CreateIncident, CreateIncidentSuccess, EIncidentActions, GetIncident, GetIncidents, GetIncidentsSuccess, GetIncidentSuccess, UpdateIncident, UpdateIncidentSuccess } from "../actions/incident.actions";
import { selectIncidentList } from "../selectors/incidents.selectors";
import { AppState } from "../state/app.state";

@Injectable()
export class IncidentEffects {
  @Effect()
  getIncident$ = this._actions$.pipe(
    ofType<GetIncident>(EIncidentActions.GetIncident),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectIncidentList))),
    switchMap(([id, incidents]) => {
      const selectedIncident = incidents.filter(incident => incident._id === id)[0];
      return of(new GetIncidentSuccess(selectedIncident));
    }),
  );
  @Effect()
  getIncidents$ = this._actions$.pipe(
    ofType<GetIncidents>(EIncidentActions.GetIncidents),
    switchMap(() => this._incidentsService.getIncidents()),
    switchMap((incident: Incident[]) => {
      return of(new GetIncidentsSuccess(incident));
    }),
  );
  @Effect()
  createIncident$ = this._actions$.pipe(
    ofType<CreateIncident>(EIncidentActions.CreateIncident),
    map(action => action.payload),
    switchMap((createIncident: Incident) => this._incidentsService.createIncident(createIncident).pipe(
      switchMap(() => of(new CreateIncidentSuccess(createIncident))),
    )),
  );
  @Effect()
  updateIncident$ = this._actions$.pipe(
    ofType<UpdateIncident>(EIncidentActions.UpdateIncident),
    map(action => action.payload),
    switchMap((action: {_id: string, data: Incident}) => this._incidentsService.updateIncident(action._id, action.data).pipe(
      switchMap(() => of(new UpdateIncidentSuccess(action))),
    )),
  );
  constructor(private _incidentsService: IncidentTable,
              private _actions$: Actions,
              private _store: Store<AppState>) {
  }
}
