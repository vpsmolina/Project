import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
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
  /*public incidents: Incident[] = IncidentsList;*/
  public incidents$: Observable<Incident[]> = this._store.pipe(select(selectIncidentList));
  filteredStates$: Observable<Incident[]> = this._store.pipe(select(selectIncidentList));
  filter: FormControl;
  filter$: Observable<string>;
  public action: IncidentEvents;
  public type = true;
  public index: number;
  public target: string;

  public selectedIncidents: string;
  constructor(@Inject(TableService) private dataService: IncidentData,
              private _router: Router,
              private _store: Store<AppState>) {
    this.filter = new FormControl("");
    this.filter$ = this.filter.valueChanges.pipe(startWith(""));
    this.filteredStates$ = combineLatest(this.incidents$, this.filter$).pipe(
      map(([incidents, filterString]) => (filterString === "") ? incidents : incidents.filter(incident => incident.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)),
    );
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
