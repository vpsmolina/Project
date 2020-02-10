import { Pipe, PipeTransform } from "@angular/core";
import { Status } from "../data/status";
import { StatusesList } from "../data/statuses";

@Pipe({
  name: "statusFilter"
})
export class FilterPipe implements PipeTransform {
  transform(statuses: Status[] = StatusesList, value: string= ""): Status[] {
    if (value !== "Open") {
      return statuses;
    }
    return statuses = statuses.filter(status => status.status !== "Re-start");
  }
}
