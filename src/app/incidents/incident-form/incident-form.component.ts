import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Field } from "../../data/field";
import { FieldsList } from "../../data/fields-list";
import { Incident } from "../../data/incident";
import { PrioritiesList } from "../../data/priorities-list";
import { Priority } from "../../data/priority";
import { Status } from "../../data/status";
import { StatusesList } from "../../data/statuses";
import { User } from "../../data/user";
import { UsersList } from "../../data/users-list";
import { DataService } from "../../services/data.service";
import { IncidentsService } from "../../services/incidents.service";
import { ValidatorsService } from "../../services/validators.service";
import { IncidentData } from "../incident-data";
import { IncidentEvents } from "../incidentevents";

@Component({
  selector: "app-incident-form",
  templateUrl: "./incident-form.component.html",
  styleUrls: ["./incident-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentFormComponent implements OnInit {

  constructor(private IncidentValidators: ValidatorsService,
              @Inject(DataService) private dataService: IncidentData,
              private router: Router, private activatedRoute: ActivatedRoute,
              private incidentsService: IncidentsService) {}
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
  public priorities: Priority[] = PrioritiesList;
  public statuses: Status[] = StatusesList;
  public data: Incident = { name: "", area: "", assignee: "", id: 0,
         startDate: undefined, dueDate: undefined, status: "", description: "", priority: ""};
  public today: number = Date.now();

  public convertDate(date: Date | number): string {
    const cDate = new Date(date);
    const month = cDate.getMonth() + 1;
    const stMonth: string = (month < 10) ? "0" + month : month.toString();
    const stDay: string = (cDate.getDate() < 10) ? "0"  + cDate.getDate() : cDate.getDate().toString();
    return cDate.getFullYear() + "-" + stMonth + "-" + stDay;
  }
  public initAddIncident(): void {
    this.formIncident = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(17)]),
      area: new FormControl(null, [Validators.required]),
      assignee: new FormControl(null),
      startDate: new FormControl(this.convertDate(this.today), [Validators.required]),
      dueDate: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
    });
    this.dataService.getCountIncidents().subscribe(num => this.count = +num);
  }

  public initEditIncident(): void {
    this.formIncident = new FormGroup({
      name: new FormControl(null),
      area: new FormControl(null),
      assignee: new FormControl(null),
      startDate: new FormControl(null),
      dueDate: new FormControl(null, [Validators.required, this.IncidentValidators.dateValidator]),
      description: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
    });
    this.dataService.getIncidentById(this.incidentId).subscribe((incident) => {
      const editIncident = {
        name: incident[0].name,
        area: incident[0].area,
        assignee: incident[0].assignee,
        startDate: this.convertDate(new Date(incident[0].startDate)),
        dueDate: this.convertDate(new Date(incident[0].dueDate)),
        description: incident[0].description,
        status: incident[0].status,
        priority: incident[0].priority,
      };
      this.data.id = incident[0].id;
      this.data._id = incident[0]._id;
      this.formIncident.setValue(editIncident);
    });

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
      this.data.description = this.formIncident.value.description;
      this.data.status = this.formIncident.value.status;
      this.hideForm();
      this.confirm = true;
    }
    this.data.startDate = new Date(this.formIncident.value.startDate);
    this.data.dueDate = new Date(this.formIncident.value.dueDate);
    this.data.area = this.formIncident.value.area;
    this.data.name = this.formIncident.value.name;
    this.data.assignee = this.formIncident.value.assignee;
    this.data.description = this.formIncident.value.description;
    this.data.status = this.formIncident.value.status;
    this.data.priority = this.formIncident.value.priority;
    this.hideForm();
    this.confirm = true;
  }
  public hideForm(): void {
    this.incidentsService.debug() ? this.router.navigate(["events"], {queryParams: {debug: true}}) : this.router.navigate(["events"]);
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
      case 2: {
        this.title = "Edit";
        this.action = 2;
        this.activatedRoute.params.subscribe(param => this.incidentId = param.id);
        this.initEditIncident();
        break;
      }
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
