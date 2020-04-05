import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { GetIncidents } from "./store/actions/incident.actions";
import { GetUser, GetUsers } from "./store/actions/user.actions";
import { AppState } from "./store/state/app.state";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})

export class AppComponent implements OnInit {
constructor(private _store: Store<AppState>,
            private _route: ActivatedRoute,
            private _router: Router) {
}
  ngOnInit(): void {
    this._store.dispatch(new GetIncidents());
    this._store.dispatch(new GetUsers());


  }


}




