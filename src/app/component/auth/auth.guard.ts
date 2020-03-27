import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AppState } from "../../store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, private _store: Store<AppState>,
              private authService: AuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["main/auth"]);
    return false;
  }

}
