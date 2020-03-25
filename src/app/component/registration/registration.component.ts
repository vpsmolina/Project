import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { RegisterResponse } from "../../models/registerPesponse";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private checkForm: AuthService,
              private fb: FormBuilder,
              private flashMessage: FlashMessagesService,
              private router: Router) { }
  public initAuthFrom(): void {
    this.loginForm = this.fb.group({
      login: ["", [ Validators.required, Validators.pattern(/^[A-z0-9]*$/)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      surname: ["", [ Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]*$/)]],
      position: ["", [ Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]*$/)]],
      birthday: ["", [ Validators.required]]
    });

  }
  ngOnInit(): void {
    this.initAuthFrom();
  }
  userRegisterClick(): boolean {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return false;
    }
    this.checkForm.registerUser(this.loginForm.value).subscribe((data: RegisterResponse) => {
      if (!data.success) {
        this.flashMessage.show(data.msg, {
          cssClass: "",
          timeout: 2000
        });
        this.router.navigate(["main/reg"]);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "",
          timeout: 2000
        });
        this.router.navigate(["main/events"]);
      }
    });
  }

}
