import { Directive } from "@angular/core";
import { Status } from "../data/status";
import { StatusesList } from "../data/statuses";

@Directive({
  selector: "[svg]"
})
export class ColorsvgDirective {

  constructor(statuses: Status[] = StatusesList, value: string, circleElement: SVGCircleElement) {

  }
}
