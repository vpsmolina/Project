import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Incident } from "../../models/incident";
import { User } from "../../models/user";
import { TableService } from "../../services/table.service";
import { EIncidentActions, UpdateIncident, UpdateIncidentSuccess } from "../actions/incident.actions";
import { CreateUser, CreateUserSuccess, DeleteUser, DeleteUserSuccess, EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess, UpdateUser, UpdateUserSuccess } from "../actions/user.actions";
import { selectUserList } from "../selectors/user.selectors";
import { AppState } from "../state/app.state";

@Injectable()
export class UserEffects {
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const selectedUser = users.filter(user => user._id === id)[0];
      return of(new GetUserSuccess(selectedUser));
    }),
  );
  @Effect()
  getUsers$ = this._actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap(() => this._usersService.getUsers()),
    switchMap((user: User[]) => {
      return of(new GetUsersSuccess(user));
    }),
  );
  @Effect()
  createUser$ = this._actions$.pipe(
    ofType<CreateUser>(EUserActions.CreateUser),
    map(action => action.payload),
    switchMap((createUser: User) => this._usersService.createUser(createUser).pipe(
      switchMap(() => of(new CreateUserSuccess(createUser))),
    )),
  );
  @Effect()
  deleteUser$ = this._actions$.pipe(
    ofType<DeleteUser>(EUserActions.DeleteUser),
    map(action => action.payload),
    switchMap((_id: string) => this._usersService.deleteUser(_id).pipe(
      switchMap(() => of(new DeleteUserSuccess(_id))),
    )),
  );
  @Effect()
  updateUser$ = this._actions$.pipe(
    ofType<UpdateUser>(EUserActions.UpdateUser),
    map(action => action.payload),
    switchMap((action: {_id: string, data: User}) => this._usersService.updateUser(action._id, action.data).pipe(
      switchMap(() => of(new UpdateUserSuccess(action))),
    )),
  );
  constructor(private _usersService: TableService,
              private _actions$: Actions,
              private _store: Store<AppState>) {
  }
}
