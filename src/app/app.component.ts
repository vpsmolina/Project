import { ChangeDetectionStrategy, Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})

export class AppComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {



  }


}




