import { NgModule } from "@angular/core";
import { ColorsvgDirective } from "./colorsvg.directive";
import { HoverDirective } from "./hover.directive";
import { StatusFilterPipe } from "./status-filter.pipe";



@NgModule({
  declarations: [
    HoverDirective,
    StatusFilterPipe,
    ColorsvgDirective,
  ],
  exports: [
    HoverDirective,
    StatusFilterPipe,
    ColorsvgDirective,
  ],
})
export class CommonModule { }
