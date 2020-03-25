import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { getLoggedUser } from "../../store/selectors/user.selectors";
import { AppState } from "../../store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  public isLogged: boolean;
  constructor(public router: Router, private _store: Store<AppState>,
              private authService: AuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @ts-ignore
    if (this.authService.logIn()) {
      return true;
    } else {
      this.router.navigate(["main/auth"]);
      return false;
    }

  }

  /*  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this._store.pipe(select(getLoggedUser)).subscribe(logged => {
        this.isLogged = logged;
      });
      if (!this.isLogged) {
        this.router.navigate(["login"]);
        return false;
      }
      return true;
    }*/
}
