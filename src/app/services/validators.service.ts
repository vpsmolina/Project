import { Injectable } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ValidatorsService {
  public dateValidator(control: FormControl): ValidationErrors {
    const today = Date.now();
    const nowDate = new Date(today);
    const currentDate = new Date(control.value);
    if (nowDate > currentDate) {
      return { invalidDate: "Invalid date"};
    }
    return null;
  }
}
