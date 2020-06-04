export class FieldModel<T> {
  id: string;
  value: T;
  controlType: string;
  placeHolder: string;
  options: DropdownOption[];
  label: string;
  required: boolean;
  errorMessage: string;
  validationMessage: string;

  constructor(field: {
    id?: string;
    value?: T;
    controlType?: string;
    placeHolder?: string;
    options?: DropdownOption[];
    label?: string;
    required?: boolean;
    errorMessage?: string;
    validationMessage?: string;
  }) {
    if (field) {
      this.id = field.id || "";
      this.value = field.value;
      this.controlType = field.controlType || "";
      this.placeHolder = field.placeHolder;
      this.options = field.options;
      this.label = field.label || " ";
      this.required = !!field.required;
      this.errorMessage = field.errorMessage;
      this.validationMessage = field.validationMessage;
    }

  }
}

class DropdownOption {
  code: string;
  value: string;
}
