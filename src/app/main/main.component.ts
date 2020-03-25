import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { environment } from "../../environments/environment";
import { IncidentData } from "../models/incident-data";
import { AuthService } from "../services/auth.service";
import { DataService } from "../services/data.service";
import { UserLogOut } from "../store/actions/auth.actions";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  selectedLanguage: string;
  languages: {id: string, title: string}[] = [];

  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router, private translateService: TranslateService,
              private authService: AuthService,
              private flashMessage: FlashMessagesService, ) {}
  public showUsers(): void {
    this.router.navigate([`main/users`]);
  }
  public showEvents(): void {
    this.router.navigate([`main/events`]);
  }
  public showProcess(): void {
    this.router.navigate([`main/process`]);
  }
  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
    this.selectedLanguage = environment.defaultLocale;

    this.translateService.get(environment.locales.map(x => `LANGUAGES.${x.toUpperCase()}`))
      .subscribe(translations => {
        this.languages = environment.locales.map(x => {
          return {
            id: x,
            title: translations[`LANGUAGES.${x.toUpperCase()}`],
          };
        });
      });
  }
  changeLocale(): void {
    this.translateService.use(this.selectedLanguage);
  }
  // tslint:disable-next-line:typedef
  logoutUser() {
    this.authService.logout();
    this.flashMessage.show("Вы вышли", {
      cssClass: "",
      timeout: 2000
    });
    this.router.navigate(["main/auth"]);
    return false;
  }
/*  public logOut(): void {
    this._store.dispatch(new UserLogOut());
    this.router.navigate(["login"]);
  }*/
}
