import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { environment } from "../../environments/environment";
import { IncidentData } from "../models/incident-data";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  selectedLanguage: string;
  languages: {id: string, title: string}[] = [];
  user: User = JSON.parse(localStorage.getItem("user"));
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
    console.log(this.user);
  }
  changeLocale(): void {
    this.translateService.use(this.selectedLanguage);
  }

  logoutUser(): void | boolean {
    this.authService.logout();
    this.flashMessage.show("Вы вышли", {
      cssClass: "",
      timeout: 2000
    });
    this.router.navigate(["main/auth"]);
    return false;
  }

}
