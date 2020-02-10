import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule, routing } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModule } from "./common.module";
import { IncidentFormComponent } from "./incidents/incident-form/incident-form.component";
import { IncidentsComponent } from "./incidents/incidents.component";
import { ProcessComponent } from "./process/process.component";
import { UsersFormComponent } from "./users/users-form/users-form.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  declarations: [
    UsersComponent,
    ProcessComponent,
    IncidentsComponent,
    IncidentFormComponent,
    UsersFormComponent,
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    routing,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MainModule { }
