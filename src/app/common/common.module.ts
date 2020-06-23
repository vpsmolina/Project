import { NgModule } from "@angular/core";
import { AreaFilterPipe } from "./area-filter.pipe";
import { StatusFilterPipe } from "./status-filter.pipe";

@NgModule({
  declarations: [
    StatusFilterPipe,
    AreaFilterPipe,
  ],
  exports: [
    StatusFilterPipe,
    AreaFilterPipe,
  ],
})
export class CommonModule { }
