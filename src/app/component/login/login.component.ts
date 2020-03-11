import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthUser, GetDataUser } from "../../store/actions/auth.actions";
import { AppState } from "../../store/state/app.state";

@Component({
  selector: "app-auth",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private _store: Store<AppState>, private router: Router) { }
  public initAuthFrom(): void {
    this.loginForm = this.fb.group({
      login: [""],
      password: [""]
    });
    this.loginForm.setValue({login: "vpsmolina", password: "123456789"});
  }
  public submitForm(): boolean {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    this._store.dispatch(new AuthUser(this.loginForm.value));
  }
  ngOnInit(): void {
    this.initAuthFrom();
  }
  ngOnDestroy(): void {
    this._store.dispatch(new GetDataUser());
  }
}
