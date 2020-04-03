import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Incident } from "../models/incident";
import { IncidentData } from "../models/incident-data";
import { TableService } from "../services/table.service";
import { selectIncidentList } from "../store/selectors/incidents.selectors";
import { AppState } from "../store/state/app.state";

@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["./process.component.less"]
})
export class ProcessComponent implements OnInit {
  public incidents$: Observable<Incident[]> = this._store.pipe(select(selectIncidentList));

  constructor(@Inject(TableService) private dataService: IncidentData,
              private _router: Router,
              private _store: Store<AppState>) {}
  ngOnInit(): void {
  }

}
