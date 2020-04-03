import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FieldsList } from "../../data/fields-list";
import { PrioritiesList } from "../../data/priorities-list";
import { StatusesList } from "../../data/statuses";
import { Field } from "../../models/field";
import { Incident } from "../../models/incident";
import { IncidentData } from "../../models/incident-data";
import { Priority } from "../../models/priority";
import { Status } from "../../models/status";
import { User } from "../../models/user";
import { TableService } from "../../services/table.service";
import { ValidatorsService } from "../../services/validators.service";
import { CreateIncident, GetIncident, GetIncidents, UpdateIncident } from "../../store/actions/incident.actions";
import { selectUserList } from "../../store/selectors/user.selectors";
import { AppState } from "../../store/state/app.state";
import { IncidentEvents } from "../incidentevents";

@Component({
  selector: "app-incident-form",
  templateUrl: "./incident-form.component.html",
  styleUrls: ["./incident-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentFormComponent implements OnInit, OnDestroy {

  constructor(private IncidentValidators: ValidatorsService,
              @Inject(TableService) private dataService: IncidentData,
              private router: Router, private activatedRoute: ActivatedRoute,
              private _store: Store<AppState>) {}
  public formIncident: FormGroup;
  public title: string;
  public incidentId: string;
  public action: Number;
  public piece: string;
  public count: number;
  public id: number;
  public incident: Incident;
  public confirm: boolean = false;
  public users$: Observable<User[]> = this._store.pipe(select(selectUserList));
  public fields: Field[] = FieldsList;
  public priorities: Priority[] = PrioritiesList;
  public statuses: Status[] = StatusesList;
  public data: Incident = { name: "", area: "", assignee: "", id: 0,
    startDate: undefined, dueDate: undefined, status: "", description: "", priority: ""};
  public today: number = Date.now();
  public statusStart: string = "Open";

  public convertDate(date: Date | number): string {
    const cDate = new Date(date);
    const month = cDate.getMonth() + 1;
    const stMonth: string = (month < 10) ? "0" + month : month.toString();
    const stDay: string = (cDate.getDate() < 10) ? "0"  + cDate.getDate() : cDate.getDate().toString();
    return cDate.getFullYear() + "-" + stMonth + "-" + stDay;
  }
  public initAddIncident(): void {
    this.formIncident = new FormGroup({
      name: new FormControl(null, [Validators.required/*, Validators.maxLength(30)*/]),
      area: new FormControl(null, [Validators.required]),
      assignee: new FormControl(null),
      startDate: new FormControl(this.convertDate(this.today), [Validators.required]),
      dueDate: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(this.statusStart, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
    });
    /*this.dataService.getCountIncidents().subscribe(num => this.count = +num);*/
  }

  public initEditIncident(): void {
    this.formIncident = new FormGroup({
      name: new FormControl(),
      area: new FormControl(null),
      assignee: new FormControl(null),
      startDate: new FormControl(null),
      dueDate: new FormControl(null, [Validators.required, this.IncidentValidators.dateValidator]),
      description: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      priority: new FormControl(null),
    });

    this.dataService.getIncidentById(this.incidentId).subscribe((incident) => {
      const editIncident = {
        name: incident["name"],
        area: incident["area"],
        assignee: incident["assignee"],
        startDate: this.convertDate(new Date(incident["startDate"])),
        dueDate: this.convertDate(new Date(incident["dueDate"])),
        description: incident["description"],
        status: incident["status"],
        priority: incident["priority"],
      };
/*      this.data.id = incident[0].id;
      this.data._id = incident[0]._id;*/
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
      const dataForm: Incident = {
        ...this.formIncident.value,
        _id: "id00000" + this.count,
        /*id: this.count + 1,*/
        startDate: new Date(this.formIncident.value.startDate),
        dueDate: new Date(this.formIncident.value.dueDate)
      };
      this.hideForm();
      this.confirm = true;
      this._store.dispatch(new CreateIncident(dataForm));
    } else if (this.action === 2) {
      const dataUpd: Incident = {
        ...this.formIncident.value,
        _id: this.activatedRoute.snapshot.params.id,
        startDate: new Date(this.formIncident.value.startDate),
        dueDate: new Date(this.formIncident.value.dueDate)
      };
      this._store.dispatch(new UpdateIncident({_id: this.activatedRoute.snapshot.params.id, data: dataUpd}));
    }


    this.hideForm();
    this.confirm = true;
  }
  public hideForm(): void {
    this.router.navigate(["main/events"]);
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
    this._store.dispatch(new GetIncident(this.activatedRoute.snapshot.params.id));
    this.piece = this.activatedRoute.snapshot.url[0].path;
    /*this._store.pipe(select(selectSelectedIncident)).subscribe(data => this.incident = data);*/
    this._action(this.piece);
  }
  ngOnDestroy(): void {
    this._store.dispatch(new GetIncidents());
  }
}
