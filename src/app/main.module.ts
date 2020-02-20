import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { AppRoutingModule, routing } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModule } from "./common/common.module";
import { IncidentFormComponent } from "./incidents/incident-form/incident-form.component";
import { IncidentsComponent } from "./incidents/incidents.component";
import { ProcessComponent } from "./process/process.component";
import { IncidentEffects } from "./store/effects/incident.effects";
import { appReducers } from "./store/reducers/app.reducers";
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
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([IncidentEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey: "router"}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MainModule { }
