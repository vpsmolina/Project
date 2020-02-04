import { ChangeDetectionStrategy, Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})

export class AppComponent implements OnInit {



  ngOnInit(): void {
  }
}




