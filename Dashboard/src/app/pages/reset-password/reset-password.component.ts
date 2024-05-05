import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NavigationExtras, Router } from "@angular/router"
import { ErrorService } from '../../auth/error.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _errorService: ErrorService, private queryParam: ActivatedRoute) {
    if (this._authService.user) {
      this.router.navigate(["pages/dashboard"])
    }
  }

  error: string;
  form: FormGroup;
  code: any;
  ngOnInit(): void {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get passwordMatch() {
    const { newPassword, confirmNewPassword } = this.form.value;

    if (newPassword === confirmNewPassword) {
      return true;
    }
    else {
      return false;
    }
  }

  submit() {
    const { newPassword, confirmNewPassword } = this.form.value;
    if (this.form.valid) {
      if (this.passwordMatch) {
        this.queryParam.queryParams.subscribe(params => { this.code = params.code })
        this._authService.resetPassword(this.code,newPassword,confirmNewPassword).subscribe(data => {
          const navigationExtras: NavigationExtras = {state: {data: 'Congratulations! Your password has been reset.'}};
          this.router.navigate(['login'], navigationExtras);
        })
      }
      else{
        this.error = "New Passwords Don't Match."
      }
    }

  }
}
