import { Pipe, PipeTransform } from "@angular/core";
import { StatusesList } from "../data/statuses";
import { Status } from "../models/status";

@Pipe({
  name: "statusFilter"
})
export class StatusFilterPipe implements PipeTransform {
  transform(statuses: Status[] = StatusesList, value: string= ""): Status[] {
    switch (value) {
      case "Open":
        statuses = statuses.filter(status => status.status === "In operation" || status.status === "Closed" || status.status === "Open");
        break;
      case "Re-start":
        statuses = statuses.filter(status => status.status === "In operation" ||  status.status === "Additional information" || status.status === "Re-start");
        break;
      case "In operation":
        statuses = statuses.filter(status => status.status === "In operation" || status.status === "Checked" || status.status === "Re-start" || status.status === "Additional information" || status.status === "Marriage");
        break;
      case "Marriage":
        statuses = statuses.filter(status => status.status === "Marriage" || status.status === "Closed" || status.status === "Additional information");
        break;
      case "Additional information":
        statuses = statuses.filter(status => status.status === "Additional information received" || status.status === "Closed" || status.status === "Additional information");
        break;
      case "Additional information received":
        statuses = statuses.filter(status => status.status === "Additional information received" || status.status === "Closed" || status.status === "Re-start" || status.status === "Checked");
        break;
      case "Checked":
        statuses = statuses.filter(status => status.status === "Checked" || status.status === "Closed" || status.status === "Resolved");
        break;
      case "Closed":
        statuses = statuses.filter(status => status.status === "Closed" || status.status === "Re-start");
        break;
      case "Resolved":
        statuses = statuses.filter(status => status.status === "Resolved" || status.status === "Re-start");
        break;
    }
    return statuses;
  }
}
