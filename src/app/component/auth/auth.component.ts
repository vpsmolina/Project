import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { AuthUser, GetDataUser } from "../../store/actions/auth.actions";
import { AppState } from "../../store/state/app.state";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
  login: string;
  password: string;
  token: string;

  constructor(private router: Router,
              private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private _store: Store<AppState>) { }

  ngOnInit(): void {
  }

  userLoginClick(): void | boolean {
    const user = {
      login: this.login,
      password: this.password,
    };

    if (user.password === undefined) {
      this.flashMessage.show("Введите пароль", {
        cssClass: "",
        timeout: 2000
      });
      return false;
    }
    this._store.dispatch(new AuthUser(user));
  }
  ngOnDestroy(): void {
    this._store.dispatch(new GetDataUser());
  }
}
