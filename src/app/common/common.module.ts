import { NgModule } from "@angular/core";
import { AreaFilterPipe } from "./area-filter.pipe";
import { HoverDirective } from "./hover.directive";
import { StatusFilterPipe } from "./status-filter.pipe";



@NgModule({
  declarations: [
    HoverDirective,
    StatusFilterPipe,
    AreaFilterPipe,
  ],
  exports: [
    HoverDirective,
    StatusFilterPipe,
    AreaFilterPipe,
  ],
})
export class CommonModule { }
