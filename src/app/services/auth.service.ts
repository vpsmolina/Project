import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RegisterResponse } from "../models/register-response";
import { User, UserAuth } from "../models/user";

@Injectable({
  providedIn: "root"})

export class AuthService {
  token: string;
  login: string;
  user: User;
  public api: string  = "http://localhost:3000";

  constructor(private http: HttpClient) {}

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

  public isLoggedIn(): boolean {
    return (localStorage.getItem("token") !== null);
  }
}
