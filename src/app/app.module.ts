import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule, routing } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { MainModule } from "./main.module";
import { MainComponent } from "./main/main.component";
import { DataService } from "./services/data.service";
import { IncidentTable } from "./services/incident-table.service";
import { IncidentsService } from "./services/incidents.service";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    routing,
    MainModule,
  ],

  providers: [IncidentsService, {
    provide: DataService, deps: [IncidentsService, HttpClient],
    useFactory: (incidentsService) => {
      if (incidentsService.debug()) {
        return new IncidentTable();
      }
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
