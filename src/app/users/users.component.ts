import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../data/user";
import { UsersList } from "../data/users-list";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  public user: User;
  public users: User[] = UsersList;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
