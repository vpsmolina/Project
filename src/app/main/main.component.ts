import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IncidentData } from "../incidents/incident-data";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router) {}
  public showUsers(): void {
    this.router.navigate([`main/users`]);
  }
  public showEvents(): void {
    this.router.navigate([`main/events`]);
  }
  public showProcess(): void {
    this.router.navigate([`main/process`]);
  }
  ngOnInit(): void {
  }

}
