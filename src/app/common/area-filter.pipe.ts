import { Pipe, PipeTransform } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Incident } from "../models/incident";
import { selectIncidentList } from "../store/selectors/incidents.selectors";
import { AppState } from "../store/state/app.state";

@Pipe({
  name: "areaFilter",
  pure: false
})
export class AreaFilterPipe implements PipeTransform {
  public incidents$: Observable<Incident[]> = this._store.pipe(select(selectIncidentList));
  constructor(private _store: Store<AppState>) {
  }
  // tslint:disable-next-line:no-any
  transform(incidents: Observable<Incident[]> = this.incidents$, value: string= ""): any {
    if (value) {
      return incidents.pipe(
        map(events => events.filter(incident => incident.area === value)),
    );
    }
      return incidents;
  }
}
