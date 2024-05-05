import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from "@angular/router"
import { ErrorService } from '../../auth/error.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _errorService: ErrorService) {
    if (this._authService.user) {
      this.router.navigate(["pages/dashboard"])
    }
  }

  success : string;
  error: string;
  form: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]]
    });
  }
  submit() {
    const { identifier } = this.form.value;
    if (this.form.valid) {
      this._authService.forgotPassword(identifier).subscribe(
        data => {
          this.success = "An email has been sent to your email address conatining instructions on how to change password."
        },
        error => {
          this.error = "Email Address Doesn't Exist.";
        }
      )
    }

  }
}
