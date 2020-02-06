import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../data/user";
import { UsersList } from "../data/users-list";
import { IncidentData } from "../incidents/incident-data";
import { DataService } from "../services/data.service";
import { IncidentsService } from "../services/incidents.service";
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
  public isDisplayed: boolean;

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router,
              private incidentsService: IncidentsService) { }
  public hideForm(displayed: boolean): void {
    this.isDisplayed = displayed;
  }
  public addUser(): void {
    this.incidentsService.debug() ? this.router.navigate([`users/add`], {queryParams: {debug: true}}) : this.router.navigate([`users/add`]);
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
