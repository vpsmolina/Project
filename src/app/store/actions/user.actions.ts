import { Action } from "@ngrx/store";
import { Incident } from "../../models/incident";
import { User } from "../../models/user";
import { EIncidentActions } from "./incident.actions";

export enum EUserActions {
  GetUsers = "[Users List] Get users",
  GetUsersSuccess = "[Users List] Get users success",
  GetUser = "[Users] Get user",
  GetUserSuccess = "[Users] Get user success",
  CreateUser = "[Create Users] Create users",
  CreateUserSuccess = "[Create Users] Create users success",
  DeleteUser = "[Users List] Delete user",
  DeleteUserSuccess = "[Users List] Delete user success",
  ResetDataUsers = "[User] Reset data user",
  UpdateUser = "[Edit User] Update users",
  UpdateUserSuccess = "[Edit User] Update users success",
}
export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}
export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: User[]) {}
}
export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: string) {}
}
export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: User) {}
}
export class CreateUser implements Action {
  public readonly type = EUserActions.CreateUser;
  constructor(public payload: User) {}
}
export class CreateUserSuccess implements Action {
  public readonly type = EUserActions.CreateUserSuccess;
  constructor(public payload: User) {}
}
export class DeleteUser implements Action {
  public readonly type = EUserActions.DeleteUser;
  constructor(public payload: string) {}
}
export class DeleteUserSuccess implements Action {
  public readonly type = EUserActions.DeleteUserSuccess;
  constructor(public payload: string) {}
}
export class ResetDataUser implements Action {
  public readonly type = EUserActions.ResetDataUsers;
}
export class UpdateUser implements Action {
  public readonly type = EUserActions.UpdateUser;
  constructor(public payload: {_id: string, data: User}) {
  }
}

export class UpdateUserSuccess implements Action {
  public readonly type = EUserActions.UpdateUserSuccess;

  constructor(public payload: { _id: string, data: User }) {
  }
}
export type UserActions =
  GetUser | GetUserSuccess |
  GetUsers | GetUsersSuccess |
  CreateUser | CreateUserSuccess |
  DeleteUser | DeleteUserSuccess | ResetDataUser |
  UpdateUser | UpdateUserSuccess;
