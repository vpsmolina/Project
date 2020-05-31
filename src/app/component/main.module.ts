import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FlashMessagesModule } from "angular2-flash-messages";
import { AppRoutingModule, routing } from "../app-routing.module";
import { AppComponent } from "../app.component";
import { CommonModule } from "../common/common.module";
import { FieldComponent } from "../field/field.component";
import { IncidentFormComponent } from "../incidents/incident-form/incident-form.component";
import { IncidentsComponent } from "../incidents/incidents.component";
import { ProcessComponent } from "../process/process.component";
import { FormService } from "../services/form.service";
import { UsersFormComponent } from "../users/users-form/users-form.component";
import { UsersComponent } from "../users/users.component";
import { AuthGuard } from "./auth/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [
    UsersComponent,
    ProcessComponent,
    IncidentsComponent,
    IncidentFormComponent,
    UsersFormComponent,
    NotFoundComponent,
    FieldComponent,
  ],
    exports: [
        UsersFormComponent,
        FieldComponent,
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
        TranslateModule,
        FlashMessagesModule,
    ],
  providers: [
        AuthGuard,
        FormService],
  bootstrap: [AppComponent]
})
export class MainModule { }
