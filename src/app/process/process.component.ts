import { Component, Inject, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IncidentData } from "../incidents/incident-data";
import { User } from "../models/user";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";
import { GetUsers } from "../store/actions/user.actions";
import { selectUserList } from "../store/selectors/user.selectors";
import { AppState } from "../store/state/app.state";

@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["./process.component.less"]
})
export class ProcessComponent implements OnInit {

  ngOnInit(): void {
  }

}
