import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IncidentData } from "../incidents/incident-data";
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
  public showProcess(): void {
    this.incidentsService.debug() ? this.router.navigate([`process`], {queryParams: {debug: true}}) : this.router.navigate([`process`]);
  }
  ngOnInit(): void {
  }

}
