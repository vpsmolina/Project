import { Pipe, PipeTransform } from "@angular/core";
import { Status } from "../data/status";
import { StatusesList } from "../data/statuses";

@Pipe({
  name: "statusFilter"
})
export class StatusFilterPipe implements PipeTransform {
  transform(statuses: Status[] = StatusesList, value: string= ""): Status[] {
    if (value === "Open") {
      return statuses = statuses.filter(status => status.status === "In operation" || status.status === "Closed" || status.status === "Open");
    }
    if (value === "Re-start") {
      return statuses = statuses.filter(status => status.status === "In operation" ||  status.status === "Additional information" || status.status === "Re-start");
    }
    if (value === "In operation") {
      return statuses = statuses.filter(status => status.status === "In operation" || status.status === "Checked" || status.status === "Re-start" || status.status === "Additional information" || status.status === "Marriage");
    }
    if (value === "Marriage") {
      return statuses = statuses.filter(status => status.status === "Marriage" || status.status === "Closed" || status.status === "Additional information");
    }
    if (value === "Additional information") {
      return statuses = statuses.filter(status => status.status === "Additional information received" || status.status === "Closed" || status.status === "Additional information");
    }
    if (value === "Additional information received") {
      return statuses = statuses.filter(status => status.status === "Additional information received" || status.status === "Closed" || status.status === "Re-start");
    }
    if (value === "Checked") {
      return statuses = statuses.filter(status => status.status === "Checked" || status.status === "Closed" || status.status === "Resolved");
    }
    if (value === "Closed") {
      return statuses = statuses.filter(status => status.status === "Closed" || status.status === "Re-start");
    }
    if (value === "Resolved") {
      return statuses = statuses.filter(status => status.status === "Resolved" || status.status === "Re-start");
    }
    return statuses;
  }
}
