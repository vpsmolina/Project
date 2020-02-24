import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth.guard";
import { IncidentFormComponent } from "./incidents/incident-form/incident-form.component";

import { IncidentsComponent } from "./incidents/incidents.component";
import { MainComponent } from "./main/main.component";
import { ProcessComponent } from "./process/process.component";
import { UsersFormComponent } from "./users/users-form/users-form.component";
import { UsersComponent } from "./users/users.component";

const itemRoutes: Routes = [
  {path: "add", component: IncidentFormComponent},
  {path: "edit/:id", component: IncidentFormComponent},
];
const itRoutes: Routes = [
  {path: "add", component: UsersFormComponent},
  {path: "delete/:id", component: UsersFormComponent},
];
const childRoutes: Routes = [
  {path: "events", component: IncidentsComponent, children: itemRoutes},
  {path: "process", component: ProcessComponent},
  {path: "users", component: UsersComponent, children: itRoutes},
];
const routes: Routes = [
  { path: "", redirectTo: "/main" , pathMatch: "full"},
  { path: "main", component: MainComponent, children: childRoutes, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent},
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
