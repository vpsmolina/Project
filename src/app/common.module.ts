import { NgModule } from "@angular/core";
import { FilterPipe } from "./incidents/filter.pipe";
import { HoverDirective } from "./incidents/hover.directive";



@NgModule({
  declarations: [
    HoverDirective,
    FilterPipe,
  ],
  exports: [
    HoverDirective,
    FilterPipe,
  ],
  imports: [

  ],
  providers: [],
})
export class CommonModule { }
