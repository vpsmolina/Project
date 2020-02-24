import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IncidentsList } from "../data/incidents-list";
import { Incident } from "../models/incident";
import { DataService } from "../services/data.service";
import { TableService } from "../services/table.service";
import { GetIncidents } from "../store/actions/incident.actions";
import { GetUsers } from "../store/actions/user.actions";
import { selectIncidentList } from "../store/selectors/incidents.selectors";
import { AppState } from "../store/state/app.state";
import { IncidentData } from "./incident-data";
import { IncidentFormComponent } from "./incident-form/incident-form.component";
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
  public isDisplayed: boolean;
  public action: IncidentEvents;
  public type = true;
  public index: number;
  public target: string;


  constructor(@Inject(TableService) private dataService: IncidentData,
              private _router: Router,
              private _store: Store<AppState>) {
}
  public hideForm(displayed: boolean): void {
    this.isDisplayed = displayed;
  }

  public addIncident(): void {
    this._router.navigate([`main/events/add`]);
  }
  public editIncident(_id: string): void {
    this._router.navigate([`main/events/edit/${_id}`]);
  }

  public actions(incidentform: IncidentFormComponent): void {
    switch (IncidentEvents[incidentform.piece]) {
      case 1: {
        if (incidentform.confirm) {
         this.dataService.createIncident(incidentform.data).subscribe(() => {
           this.incidents.push(incidentform.data);
          });

        }
        break;
      }
      case 2: {
        if (incidentform.confirm) {
          this.dataService.updateIncident(incidentform.incidentId, incidentform.data).subscribe(() => {
            this.incidents.forEach(incident => {
              if (incident._id === incidentform.incidentId) {
                incident.name = incidentform.data.name;
                incident.assignee = incidentform.data.assignee;
                incident.area = incidentform.data.area;
                incident.startDate = incidentform.data.startDate;
                incident.dueDate = incidentform.data.dueDate;
                incident.description = incidentform.data.description;
                incident.status = incidentform.data.status;
                incident.priority = incidentform.data.priority;
              }
            });
          });
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  private _reloadIncidents(): void {
    this.dataService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }
  ngOnInit(): void {
    /*this._reloadIncidents();*/
    this._store.dispatch(new GetIncidents());
  }

}
