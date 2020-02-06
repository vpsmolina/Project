import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Incident } from "../data/incident";
import { IncidentsList } from "../data/incidents-list";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";
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
  public isDisplayed: boolean;
  public action: IncidentEvents;
  public type = true;
  public index: number;
  public target: string;

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router,
              private incidentsService: IncidentsService) {}
  public hideForm(displayed: boolean): void {
    this.isDisplayed = displayed;
  }
  public addForm(displayed: boolean): void {
    this.isDisplayed = !displayed;
    this.action = IncidentEvents.add;
  }
  public addIncident(): void {
    this.incidentsService.debug() ? this.router.navigate([`events/add`], {queryParams: {debug: true}}) : this.router.navigate([`events/add`]);
  }
  public editIncident(_id: string): void {
    this.incidentsService.debug() ? this.router.navigate([`events/edit/${_id}`], {queryParams: {debug: true}}) : this.router.navigate([`events/edit/${_id}`]);
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
  private _reloadUsers(): void {
    this.dataService.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }
  ngOnInit(): void {
    this._reloadUsers();
  }

}
