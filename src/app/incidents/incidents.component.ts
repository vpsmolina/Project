import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Field } from "../data/field";
import { FieldsList } from "../data/fieldslist";
import { Incident } from "../data/incident";
import { Incidentslist } from "../data/incidentslist";
import { Priority } from "../data/priority";
import { User } from "../data/user";
import { UsersList } from "../data/userslist";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";
import { IncidentData } from "./incident-data";
import { IncidentEvents } from "./incidentevents";

@Component({
  selector: "app-incidents",
  templateUrl: "./incidents.component.html",
  styleUrls: ["./incidents.component.less"]
})
export class IncidentsComponent implements OnInit {
  public formIncident: FormGroup;
  public title: string;
  public incidentId: string;
  public target = " ";
  public action: Number;
  public piece: string;
  public count: number;
  public confirm: boolean = false;
  public users: User[] = UsersList;
  public fields: Field[] = FieldsList;
  public data: Incident = { name: "", area: "", assignee: "", id: 0,
    startDate: undefined, dueDate: undefined, status: ""};

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router, private activatedRoute: ActivatedRoute,
              private incidentsService: IncidentsService) {}
  public initAddIncident(): void {
    this.formIncident = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(9)]),
      area: new FormControl(null, [Validators.required]),
      assignee: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      dueDate: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });
    this.dataService.getCountIncidents().subscribe(num => this.count = +num);
  }
  public onSubmit(): boolean {
    const controls = this.formIncident.controls;
    if (this.formIncident.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    if (this.action === 1) {
      if (this.incidentsService.debug()) {
        this.data._id = "id00000" + this.count;
      }
      this.data.id = this.count + 1;
      this.data.startDate = new Date(this.formIncident.value.startDate);
      this.data.dueDate = new Date(this.formIncident.value.dueDate);
      this.data.area = this.formIncident.value.area;
      this.data.name = this.formIncident.value.name;
      this.data.assignee = this.formIncident.value.assignee;
      this.data.status = this.formIncident.value.status;
      this.hideForm();
      this.confirm = true;
    }
    this.data.startDate = new Date(this.formIncident.value.startDate);
    this.data.dueDate = new Date(this.formIncident.value.dueDate);
    this.data.area = this.formIncident.value.area;
    this.data.name = this.formIncident.value.name;
    this.data.assignee = this.formIncident.value.assignee;
    this.data.status = this.formIncident.value.status;
    this.hideForm();
    this.confirm = true;
  }
  public hideForm(): void {
    this.incidentsService.debug() ? this.router.navigate([""], {queryParams: {debug: true}}) : this.router.navigate([""]);
    this.confirm = false;
  }

  private _action(piece: string): void {
    switch (IncidentEvents[piece]) {
      case 1: {
        this.title = "Add new student";
        this.action = 1;
        this.initAddIncident();
        break;
      }
/*      case 2: {
        this.title = "Edit";
        this.action = 2;
        this.activatedRoute.params.subscribe(param => this.incidentId = param.id);
        this.initEditIncident();
        break;
      }*/
      default: {
        break;
      }
    }
  }

  ngOnInit(): void {
    this.piece = this.activatedRoute.snapshot.url[0].path;
    this._action(this.piece);
  }

}
