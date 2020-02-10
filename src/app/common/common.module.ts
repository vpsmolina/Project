import { NgModule } from "@angular/core";
import { FilterPipe } from "./filter.pipe";
import { HoverDirective } from "./hover.directive";



@NgModule({
  declarations: [
    HoverDirective,
    FilterPipe,
  ],
  exports: [
    HoverDirective,
    FilterPipe,
  ],
})
export class CommonModule { }
