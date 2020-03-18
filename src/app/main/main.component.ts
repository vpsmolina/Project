import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../environments/environment";
import { IncidentData } from "../models/incident-data";
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
  constructor(@Inject(DataService) private dataService: IncidentData,
              private router: Router, private translateService: TranslateService) {}
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
}
