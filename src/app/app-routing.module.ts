import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IncidentsComponent } from "./incidents/incidents.component";
import { MainComponent } from "./main/main.component";

const childRoutes: Routes = [
  {path: "add", component: IncidentsComponent},
];
const routes: Routes = [
  { path: "", component: MainComponent, children: childRoutes }];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
