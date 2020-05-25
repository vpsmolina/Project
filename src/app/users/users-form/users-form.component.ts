import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { FieldModel } from "../../models/field.model";
import { IncidentData } from "../../models/incident-data";
import { User } from "../../models/user";
import { DataService } from "../../services/data.service";
import { FormService } from "../../services/form.service";
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
  styleUrls: ["./users-form.component.less"]
})
export class UsersFormComponent implements OnInit, OnDestroy {
  public formUser: FormGroup;
  public action: Number;
  public confirm: boolean = false;
  public id: number;
  public fields$: FieldModel<string>[];
  public personalInfoForm: FormGroup;
  constructor(@Inject(DataService) private dataService: IncidentData,
              private fb: FormBuilder,
              private router: Router, private activatedRoute: ActivatedRoute,
              private _store: Store<IAppState>,
              private httpClient: HttpClient,
              private formControlService: FormService) {
                    this.httpClient.get("./assets/model-form.json")
                      .pipe(map((fields$: FieldModel<string>[]) => {
                        return fields$.map(field => {
                          return new FieldModel(field);
                        });
                      }))
                      // tslint:disable-next-line:no-any
                      .subscribe((fields: any) => {
                        /*this.fields = fields;*/
                        this.fields$ = fields;
                        this.personalInfoForm = this.formControlService.getFormGroupObject(fields);
                      });
  }


  public initAddUserForm(): void {
    this.formUser = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.pattern(/^[A-z0-9]*$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      position: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё ]*$/)]),
      birthday: new FormControl(null),
    });
  }
  // tslint:disable-next-line:typedef
/*  getFields() {
    this.httpClient.get("./assets/model-form.json")
      .pipe(map((fields$: FieldModel<string>[]) => {
        return fields$.map(field => {
          return new FieldModel(field);
        });
      }))
      // tslint:disable-next-line:no-any
      .subscribe((fields: any) => {
        /!*this.fields = fields;*!/
        this.fields$ = fields;
        this.personalInfoForm = this.formControlService.getFormGroupObject(fields);
      });
  }*/
  public submitForm(): void {
/*    const controls = this.personalInfoForm.controls;
    if (this.personalInfoForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }*/
    const data: User = {
      /*...this.formUser.value,*/
      ...this.personalInfoForm.value,
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
        /*this.initAddUserForm();*/
        /*this.getFields();*/
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
