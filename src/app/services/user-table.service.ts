import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UsersList } from "../data/users-list";
import { User } from "../models/user";

import { DataService } from "./data.service";

/*
@Injectable({
  providedIn: "root"})

export class UserTable {
  public api: string = "http://localhost:4000/api" + "users/";


  constructor(private http: HttpClient) {}

  public createUser(data: User): Observable<User> {
    return this.http.post<User>(this.api, data);
  }


  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  public updateUser(_id: string, data: User ): Observable<User> {
    return this.http.put<User>(this.api + _id, data);
  }


  public deleteUser(_id: string): Observable<string> {
    return this.http.delete<string>(this.api + _id);
  }

  // Error handling
/!*  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }*!/

}
*/
