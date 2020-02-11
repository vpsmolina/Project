import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Incident } from "../data/incident";
import { IncidentsList } from "../data/incidents-list";
import { IncidentData } from "../incidents/incident-data";
import { IncidentFormComponent } from "../incidents/incident-form/incident-form.component";
import { IncidentEvents } from "../incidents/incidentevents";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";

@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["./process.component.less"]
})
export class ProcessComponent implements OnInit {

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router, private activatedRoute: ActivatedRoute,
              private incidentsService: IncidentsService) { }

  ngOnInit(): void {
  }

}
