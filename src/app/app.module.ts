import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FlashMessagesModule } from "angular2-flash-messages";
import { environment } from "../environments/environment";
import { AppRoutingModule, routing } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./component/auth/auth.component";
import { MainModule } from "./component/main.module";
import { ProfileComponent } from "./component/profile/profile.component";
import { MainComponent } from "./main/main.component";
import { AuthEffects } from "./store/effects/auth.effects";
import { IncidentEffects } from "./store/effects/incident.effects";
import { UserEffects } from "./store/effects/user.effects";
import { appReducers } from "./store/reducers/app.reducers";


export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, "./assets/locale/", ".json");
}
@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        AuthComponent,
        ProfileComponent,
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
        FormsModule,
        FlashMessagesModule.forRoot(),
        ReactiveFormsModule,
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
