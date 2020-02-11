import { NgModule } from "@angular/core";
import { HoverDirective } from "./hover.directive";
import { StatusFilterPipe } from "./status-filter.pipe";



@NgModule({
  declarations: [
    HoverDirective,
    StatusFilterPipe,
  ],
  exports: [
    HoverDirective,
    StatusFilterPipe,
  ],
})
export class CommonModule { }
