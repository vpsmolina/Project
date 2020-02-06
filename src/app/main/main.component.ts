import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Incident } from "../data/incident";
import { IncidentsList } from "../data/incidents-list";
import { IncidentData } from "../incidents/incident-data";
import { IncidentFormComponent } from "../incidents/incident-form/incident-form.component";
import { IncidentEvents } from "../incidents/incidentevents";
import { IncidentsComponent } from "../incidents/incidents.component";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router,
              private incidentsService: IncidentsService) {}
  public showUsers(): void {
    this.incidentsService.debug() ? this.router.navigate([`users`], {queryParams: {debug: true}}) : this.router.navigate([`users`]);
  }
  public showEvents(): void {
    this.incidentsService.debug() ? this.router.navigate([`events`], {queryParams: {debug: true}}) : this.router.navigate([`events`]);
  }
  ngOnInit(): void {
  }

}
