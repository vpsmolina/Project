import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FieldModel } from "../models/field.model";


@Injectable({
  providedIn: "root"
})

export class FormService {
  constructor(private http: HttpClient) {
  }
  getFormGroupObject(fields: FieldModel<string>[]): FormGroup {
    const formGroup = {};
    fields
      .forEach(field => {
      formGroup[field.id] = field.required
        ? new FormControl(field.value, Validators.required)
        : new FormControl(field.value);
    });
    return new FormGroup(formGroup);
  }

  // tslint:disable-next-line:typedef
  public getFields() {
    return this.http.get("./assets/model-form.json");
  }
}
