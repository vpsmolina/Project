import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../data/user";
import { IncidentData } from "../../incidents/incident-data";
import { DataService } from "../../services/data.service";
import { IncidentsService } from "../../services/incidents.service";


@Component({
  selector: "app-users-form",
  templateUrl: "./users-form.component.html",
  styleUrls: ["./users-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent implements OnInit {

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router, private activatedRoute: ActivatedRoute,
              private incidentsService: IncidentsService) { }
  public formUser: FormGroup;
  public count: number;
  public title: string;
  public action: Number;
  public piece: string;
  public confirm: boolean = false;
  public data: User = {login: "", password: "", position: "", birthday: undefined, assignee: ""};

  public initAddUser(): void {
    this.formUser = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.maxLength(17)]),
      password: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required]),
      assignee: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null),
    });
    this.dataService.getCountUsers().subscribe(num => this.count = +num);
  }
  public onSubmit(): boolean {
    const controls = this.formUser.controls;
    if (this.formUser.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    this.data.birthday = new Date(this.formUser.value.birthday );
    this.data.login = this.formUser.value.login;
    this.data.password = this.formUser.value.password;
    this.data.assignee = this.formUser.value.assignee;
    this.data.position = this.formUser.value.position;
    this.hideForm();
    this.confirm = true;
  }
  public hideForm(): void {
    this.incidentsService.debug() ? this.router.navigate(["users"], {queryParams: {debug: true}}) : this.router.navigate(["events"]);
    this.confirm = false;
  }
  private _action(piece: string): void {
    this.title = "Add new student";
    this.action = 1;
    this.initAddUser();
  }
  ngOnInit(): void {
    this.piece = this.activatedRoute.snapshot.url[0].path;
    this._action(this.piece);
  }

}
