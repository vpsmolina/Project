import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UsersList } from "../data/users-list";
import { IncidentData } from "../models/incident-data";
import { User } from "../models/user";
import { DataService } from "../services/data.service";
import { GetUsers } from "../store/actions/user.actions";
import { selectUserList } from "../store/selectors/user.selectors";
import { AppState } from "../store/state/app.state";


@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  public user: User;
  public users: User[] = UsersList;
  public users$: Observable<User[]> = this._store.pipe(select(selectUserList));

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _store: Store<AppState>) { }
  public addUser(): void {
    this.router.navigate([`main/users/add`]);
  }
  public delete(_id: string): void {
    this.router.navigate([`main/users/delete/${_id}`]);
  }
  public editUser(_id: string): void {
    this.router.navigate([`main/edit/${_id}`]);
  }

  ngOnInit(): void {
    this._store.dispatch(new GetUsers());
  }
}
