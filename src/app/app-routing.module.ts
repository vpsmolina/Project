import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncidentFormComponent } from "./incidents/incident-form/incident-form.component";

import { IncidentsComponent } from "./incidents/incidents.component";
import { MainComponent } from "./main/main.component";
import { UsersComponent } from "./users/users.component";

const itemRoutes: Routes = [
  {path: "add", component: IncidentFormComponent},
];
const childRoutes: Routes = [
  {path: "events", component: IncidentsComponent, children: itemRoutes},
  /*{path: "add", component: IncidentFormComponent},*/
  {path: "users", component: UsersComponent},
];
const routes: Routes = [
  { path: "", component: MainComponent, children: childRoutes }];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
