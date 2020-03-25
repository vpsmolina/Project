import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tokenNotExpired } from "angular2-jwt";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Auth } from "../models/auth";
import { RegisterResponse } from "../models/registerPesponse";
import { User, UserAuth } from "../models/user";

@Injectable({
  providedIn: "root"})

export class AuthService {
  constructor(private http: HttpClient) {
  }
  token: string;
  login: string;
  user: User;
  public api: string  = "http://localhost:3000";
  // tslint:disable-next-line:typedef
  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post(
      "http://localhost:3000/account/reg",
      user,

      {headers: headers}).pipe(map(res => res));
  }


  // tslint:disable-next-line:typedef
  authenUser(data: UserAuth): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.api}/account/auth`, data).pipe(
      map(
        res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          return res;
        },
      ),
    );
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
/*  isLoggedIn(): boolean {
    return tokenNotExpired();
  }*/
  public isLoggedIn(): boolean {
    return (localStorage.getItem("token") !== null);
  }
  public get logIn(): boolean {
    return (localStorage.getItem("token") !== null);
  }
}
