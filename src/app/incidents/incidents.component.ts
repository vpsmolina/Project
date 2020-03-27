import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IncidentsList } from "../data/incidents-list";
import { Incident } from "../models/incident";
import { IncidentData } from "../models/incident-data";
import { TableService } from "../services/table.service";
import { GetIncidents } from "../store/actions/incident.actions";
import { selectIncidentList } from "../store/selectors/incidents.selectors";
import { AppState } from "../store/state/app.state";
import { IncidentEvents } from "./incidentevents";

@Component({
  selector: "app-incidents",
  templateUrl: "./incidents.component.html",
  styleUrls: ["./incidents.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentsComponent implements OnInit {
  public incident: Incident;
  public incidents: Incident[] = IncidentsList;
  public incidents$: Observable<Incident[]> = this._store.pipe(select(selectIncidentList));
  public action: IncidentEvents;
  public type = true;
  public index: number;
  public target: string;


  constructor(@Inject(TableService) private dataService: IncidentData,
              private _router: Router,
              private _store: Store<AppState>) {
  }

  public addIncident(): void {
    this._router.navigate([`main/events/add`]);
  }
  public editIncident(_id: string): void {
    this._router.navigate([`main/events/edit/${_id}`]);
  }

  ngOnInit(): void {
    this._store.dispatch(new GetIncidents());
  }

}
