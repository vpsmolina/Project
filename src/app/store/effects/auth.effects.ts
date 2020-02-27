import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Auth } from "../../models/auth";
import { UserAuth } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { AuthUser, AuthUserSuccess, EAuthActions,  UserLogOut } from "../actions/auth.actions";
import { ResetDataUser } from "../actions/user.actions";
import { AppState } from "../state/app.state";

@Injectable()
export class AuthEffects {
  @Effect()
  authUser$ = this._actions$.pipe(
    ofType<AuthUser>(EAuthActions.AuthUser),
    map(action => action.payload),
    switchMap((action: UserAuth) => this._userService.authUser(action).pipe(
      switchMap((res: Auth) => of(new AuthUserSuccess({token: res.token, login: action.login}))),
      tap(() => this.router.navigate(["/"])),
    )),
  );

  @Effect()
  userLogOut$ = this._actions$.pipe(
    ofType<UserLogOut>(EAuthActions.UserLogOut),
    switchMap(() => of(new ResetDataUser())),
  );
  constructor(
    private _userService: AuthService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<AppState>) {}
}
