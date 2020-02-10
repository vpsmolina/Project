import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule, routing } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { CommonModule } from "./common.module";
import { IncidentFormComponent } from "./incidents/incident-form/incident-form.component";
import { IncidentsComponent } from "./incidents/incidents.component";
import { MainModule } from "./main.module";
import { MainComponent } from "./main/main.component";
import { ProcessComponent } from "./process/process.component";
import { DataService } from "./services/data.service";
import { IncidentTable } from "./services/incident-table.service";
import { IncidentsService } from "./services/incidents.service";
import { UsersFormComponent } from "./users/users-form/users-form.component";
import { UsersComponent } from "./users/users.component";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
