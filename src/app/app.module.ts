import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

import { AppRoutingModule, routing } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { MainModule } from "./main.module";
import { MainComponent } from "./main/main.component";
import { AuthEffects } from "./store/effects/auth.effects";
import { IncidentEffects } from "./store/effects/incident.effects";
import { UserEffects } from "./store/effects/user.effects";
import { appReducers } from "./store/reducers/app.reducers";


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
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([IncidentEffects, UserEffects, AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey: "router"}),
  ],

/*  providers: [IncidentsService, {
    provide: DataService, deps: [IncidentsService, HttpClient],
    useFactory: (incidentsService) => {
      if (incidentsService.debug()) {
        return new IncidentTable();
      }
    }
  }],*/

  bootstrap: [AppComponent]
})
export class AppModule { }
