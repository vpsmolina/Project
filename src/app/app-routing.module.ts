import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./component/auth/auth.component";
import { AuthGuard } from "./component/auth/auth.guard";
import { NotFoundComponent } from "./component/not-found/not-found.component";
import { IncidentFormComponent } from "./incidents/incident-form/incident-form.component";

import { RegistrationComponent } from "./component/registration/registration.component";
import { IncidentsComponent } from "./incidents/incidents.component";
import { MainComponent } from "./main/main.component";
import { ProcessComponent } from "./process/process.component";
import { UsersFormComponent } from "./users/users-form/users-form.component";
import { UsersComponent } from "./users/users.component";

const itemRoutes: Routes = [
  {path: "add", component: IncidentFormComponent, canActivate: [AuthGuard]},
  {path: "edit/:id", component: IncidentFormComponent, canActivate: [AuthGuard]},
];
const itRoutes: Routes = [
  {path: "add", component: UsersFormComponent, canActivate: [AuthGuard]},
  {path: "delete/:id", component: UsersFormComponent, canActivate: [AuthGuard]},
];
const childRoutes: Routes = [
  {path: "events", component: IncidentsComponent, children: itemRoutes},
  {path: "process", component: ProcessComponent},
  {path: "users", component: UsersComponent, children: itRoutes},
  { path: "reg", component: RegistrationComponent},
  { path: "auth", component: AuthComponent},
];
const routes: Routes = [
  { path: "", redirectTo: "/main" , pathMatch: "full"},
  { path: "main", component: MainComponent, children: childRoutes},
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404"},
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
