import { Action } from "@ngrx/store";
import { User, UserAuth } from "../../models/user";

export enum EAuthActions {
  AuthUser = "[Auth] User Authorization",
  AuthUserSuccess = "[Auth] User Authorization success",
  logInFail = "[Login] User Authorization fail",
  UserLogOut = "[Auth] User log out",
  GetDataUser = "[User] Get data user",
  GetDataUserSuccess = "[User] Get data user success"
}
export class AuthUser implements Action {
  public readonly type = EAuthActions.AuthUser;
  constructor(public payload: UserAuth ) {}
}
export class AuthUserSuccess implements Action {
  public readonly type = EAuthActions.AuthUserSuccess;
  constructor(public payload: { login: string; token: string }) {}
}
export class GetDataUser implements Action {
  public readonly type = EAuthActions.GetDataUser;
}
export class GetDataUserSuccess implements Action {
  public readonly type = EAuthActions.GetDataUserSuccess;
  constructor(public payload: User) {}
}
export class LogInFail implements Action {
  public readonly type = EAuthActions.logInFail;
}
export class UserLogOut implements Action {
  public readonly type = EAuthActions.UserLogOut;
}
export type AuthActions =
  AuthUser |
  AuthUserSuccess |
  LogInFail |
  UserLogOut | GetDataUser | GetDataUserSuccess;
