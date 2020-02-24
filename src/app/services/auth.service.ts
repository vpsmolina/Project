import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UsersList } from "../data/users-list";
import { Auth } from "../models/auth";
import { User, UserAuth } from "../models/user";

@Injectable({
  providedIn: "root"})

export class AuthService {
  private _users: User[] = UsersList;
  private _user: User;
  public authUser(data: UserAuth): Observable<Auth> {
    return of(data);
  }
  public logIn(login: string, token: string): Observable<User> {
    this._user = this._users.find(user => user.login === login);
    return of(this._user);
  }
  public getToken(): string {
    return localStorage.getItem("token");
  }
}
