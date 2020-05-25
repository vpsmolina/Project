import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FieldModel } from "../models/field.model";


@Injectable({
  providedIn: "root"
})

export class FormService {
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
}
