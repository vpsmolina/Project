import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldModel } from "../models/field.model";

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements OnInit {
  @Input() field: FieldModel<string>;
  @Input() form: FormGroup;

  get isValid(): boolean {
    return !this.form.controls[this.field.id].touched || this.form.controls[this.field.id].valid;
  }

  ngOnInit(): void {
  }

}
