import { ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Incident } from "../../models/incident";
import { User } from "../../models/user";
import { GetIncidents } from "../../store/actions/incident.actions";
import { GetUser, GetUsers } from "../../store/actions/user.actions";
import { selectIncidentList } from "../../store/selectors/incidents.selectors";
import { selectSelectedUser } from "../../store/selectors/user.selectors";
import { AppState } from "../../store/state/app.state";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public user: User;
  public id: number;
  public incidents$: Observable<Incident[]> = this._store.pipe(select(selectIncidentList));
  constructor(private _store: Store<AppState>,
              private _route: ActivatedRoute,
              private _router: Router) { }
  ngOnInit(): void {
    this._store.dispatch(new GetUser(this._route.snapshot.params.id));
    this._store.pipe(select(selectSelectedUser)).subscribe(data => this.user = data);
    console.log(this.user.surname);
  }
}
