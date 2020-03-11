import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Auth } from "../models/auth";
import { User, UserAuth } from "../models/user";

@Injectable({
  providedIn: "root"})

export class AuthService {

  public authUser(data: UserAuth): Observable<Auth> {
    const token = localStorage.getItem("token");
    return of(data);
  }
  public getToken(): string {
    return localStorage.getItem("token");
  }
  public getAuthUser(data: UserAuth): Observable<UserAuth> {
    return of(data).pipe(
      map(
        res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("login", res.login);
          return res;
        },
      ),
    );
  }
}
