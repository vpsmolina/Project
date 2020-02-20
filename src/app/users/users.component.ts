import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UsersList } from "../data/users-list";
import { IncidentData } from "../incidents/incident-data";
import { User } from "../models/user";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";
import { CreateUser, DeleteUser, GetUsers } from "../store/actions/user.actions";
import { selectUserList } from "../store/selectors/user.selectors";
import { AppState } from "../store/state/app.state";
import { UsersFormComponent } from "./users-form/users-form.component";

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
  public isDisplayed: boolean;

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private incidentsService: IncidentsService,
              private _store: Store<AppState>) { }
  public hideForm(displayed: boolean): void {
    this.isDisplayed = displayed;
  }
  public addUser(): void {
    this.incidentsService.debug() ? this.router.navigate([`users/add`], {queryParams: {debug: true}}) : this.router.navigate([`users/add`]);
  }
  public delete(_id: string): void {

  }
  public actions(userform: UsersFormComponent): void {
    if (userform.confirm) {
      this.dataService.createUser(userform.data).subscribe(() => {
        this.users.push(userform.data);
      });
    }
  }
  private _reloadUsers(): void {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  ngOnInit(): void {
    this._reloadUsers();
  }

}
