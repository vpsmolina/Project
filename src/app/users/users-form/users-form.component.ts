import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { UsersList } from "../../data/users-list";
import { IncidentData } from "../../models/incident-data";
import { User } from "../../models/user";
import { DataService } from "../../services/data.service";
import { CreateUser, DeleteUser, GetUsers } from "../../store/actions/user.actions";
import { getCountUser } from "../../store/selectors/user.selectors";
class IAppState {
}

enum Action {
  delete = "delete",
  add = "add"
}
@Component({
  selector: "app-users-form",
  templateUrl: "./users-form.component.html",
  styleUrls: ["./users-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFormComponent implements OnInit, OnDestroy {
  public formUser: FormGroup;
  public action: Number;
  public confirm: boolean = false;
  public id: number;

  constructor(@Inject(DataService) private dataService: IncidentData,
              private fb: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute,
              private _store: Store<IAppState>) { }

  public initAddUserForm(): void {
    this.formUser = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.maxLength(17)]),
      password: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё ]*$/)]),
      birthday: new FormControl(null),
    });
  }

  public submitForm(): boolean {
    const controls = this.formUser.controls;
    if (this.formUser.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    const data: User = {
      ...this.formUser.value,
      id: this.id + 1,
    };
    this._store.dispatch(new CreateUser(data));
    this.router.navigate(["main/users"]);
  }
  public delete(): void {
    this._store.dispatch(new DeleteUser(this.activatedRoute.snapshot.url[1].path));
    this.router.navigate(["main/users"]);
  }

  private _action(event: string): void {
    switch (event) {
      case Action.delete: {
        this.confirm = true;
        break;
      }
      case Action.add: {
        this.initAddUserForm();
        this._store.pipe(select(getCountUser)).subscribe(count => this.id = count).unsubscribe();
        break;
      }
      default: {
        break;
      }
    }
  }
  ngOnInit(): void {
    this._action(this.activatedRoute.snapshot.url[0].path);
  }
  ngOnDestroy(): void {
    this._store.dispatch(new GetUsers());
  }

}
