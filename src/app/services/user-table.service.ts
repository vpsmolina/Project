/*import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../data/user";
import { UsersList } from "../data/users-list";

import { UserData } from "../users/users-form/user-data";
import { DataService } from "./data.service";

@Injectable({
  providedIn: DataService})

export class UserTable implements UserData {
  private _users: User[] = UsersList;
  private _user: User;
  public getUsers(): Observable<User[]> {
    return of(this._users);
  }
  public createUser(data: User): Observable<User> {
    return of(data);
  }

  public getCountUsers(): Observable<Number> {
    return of(this._users.length);
  }


}*/
