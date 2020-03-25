import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { Auth } from "../../models/auth";
import { RegisterResponse } from "../../models/registerPesponse";
import { User, UserAuth } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { AuthUser, AuthUserSuccess, EAuthActions, UserLogOut } from "../actions/auth.actions";
import { ResetDataUser } from "../actions/user.actions";
import { AppState } from "../state/app.state";

@Injectable()
export class AuthEffects {
  @Effect()
  authUser$ = this._actions$.pipe(
    ofType<AuthUser>(EAuthActions.AuthUser),
    map(action => action.payload),
    exhaustMap((action: User) => this._userService.authenUser(action).pipe(
      exhaustMap((res: RegisterResponse) => of(new AuthUserSuccess({token: res.token, user: res.user}))),
      tap(() => this.router.navigate(["main/events"])),
    )),
  );
  @Effect()
  userLogOut$ = this._actions$.pipe(
    ofType<UserLogOut>(EAuthActions.UserLogOut),
    switchMap(() => of(new ResetDataUser())),
  );

/*  @Effect()
  getUserData$ = this._actions$.pipe(
    ofType<GetDataUser>(EAuthActions.GetDataUser),
    switchMap(() => this._store.pipe(select(getAuthData))),
    switchMap((action: AuthState) => this._userService.getAuthUser(action.token, action.user).pipe(
      switchMap((result: User) => of(new GetDataUserSuccess(result))),
    )),
  );*/
/*  @Effect()
  getUserData$ = this._actions$.pipe(
    ofType<GetDataUser>(EAuthActions.GetDataUser),
    switchMap(() => this._store.pipe(select(getAuthData))),
    switchMap((action: AuthState) => this._userService.getAuthUser(action., action.token).pipe(
      switchMap((result: User) => of(new GetDataUserSuccess(result))),
    )),
  );*/

  constructor(
    private _userService: AuthService,
    private _actions$: Actions,
    private router: Router,
    private _store: Store<AppState>) {}
}
