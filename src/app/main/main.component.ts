import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Incident } from "../data/incident";
import { Incidentslist } from "../data/incidentslist";
import { IncidentData } from "../incidents/incident-data";
import { IncidentEvents } from "../incidents/incidentevents";
import { IncidentsComponent } from "../incidents/incidents.component";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"]
})
export class MainComponent implements OnInit {
  public incident: Incident;
  public incidents: Incident[] = Incidentslist;
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
    this.incidentsService.debug() ? this.router.navigate([`add`], {queryParams: {debug: true}}) : this.router.navigate([`add`]);
  }
  public editIncident(_id: string): void {
    this.incidentsService.debug() ? this.router.navigate([`edit/${_id}`], {queryParams: {debug: true}}) : this.router.navigate([`edit/${_id}`]);
  }
  public actions(incidentform: IncidentsComponent): void {
    switch (IncidentEvents[incidentform.piece]) {
      case 1: {
        if (incidentform.confirm) {
          this.dataService.createIncident(incidentform.data).subscribe(() => {
            this.incidents.push(incidentform.data);
          });
        }
        break;
      }
/*      case 2: {
        if (incidentform.confirm) {
          this.dataService.updateIncident(incidentform.incidentId, incidentform.data).subscribe(() => {
            this.incidents.forEach(incident => {
              if (incident._id === incidentform.incidentId) {
                incident.name = incidentform.data.name;
                incident.assignee = incidentform.data.assignee;
                incident.area = incidentform.data.area;
                incident.startDate = incidentform.data.startDate;
                incident.dueDate = incidentform.data.dueDate;
                incident.status = incidentform.data.status;
              }
            });
          });
        }
        break;
      }*/
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
