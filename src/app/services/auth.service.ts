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

  public authUser(data: UserAuth): Observable<UserAuth> {
    return of(data);
  }
  public getToken(): string {
    return localStorage.getItem("token");
  }
}
