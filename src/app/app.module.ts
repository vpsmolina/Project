import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppRoutingModule, routing } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { IncidentsComponent } from "./incidents/incidents.component";
import { MainComponent } from "./main/main.component";
import { DataService } from "./services/data.service";
import { IncidentTable } from "./services/incident-table.service";
import { IncidentsService } from "./services/incidents.service";
import { UsersComponent } from './users/users.component';
import { IncidentFormComponent } from './incidents/incident-form/incident-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    IncidentsComponent,
    MainComponent,
    UsersComponent,
    IncidentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    routing,
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
