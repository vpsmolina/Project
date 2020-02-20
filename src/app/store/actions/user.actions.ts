import { Action } from "@ngrx/store";
import { User } from "../../models/user";

export enum EUserActions {
  GetUsers = "[Users List] Get users",
  GetUsersSuccess = "[Users List] Get users success",
  GetUser = "[Users] Get user",
  GetUserSuccess = "[Users] Get user success",
  CreateUser = "[Create Users] Create users",
  CreateUserSuccess = "[Create Users] Create users success",
  GetCountUsers = "[Users] Get count users",
  DeleteUser = "[Users List] Delete user",
  DeleteUserSuccess = "[Users List] Delete user success",
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
export type UserActions =
  GetUser | GetUserSuccess |
  GetUsers | GetUsersSuccess |
  CreateUser | CreateUserSuccess |
  DeleteUser | DeleteUserSuccess;
