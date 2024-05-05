import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NavigationExtras, Router } from "@angular/router"
import { ErrorService } from '../../auth/error.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _errorService: ErrorService, private loginComponent: LoginComponent) {
    if (this._authService.user) {
      this.router.navigate(["pages/dashboard"])
    }
  }

  error: string;
  form: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[A-Za-z][A-Za-z .,-]*$')]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[A-Za-z][A-Za-z .,-]*$')]],
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  submit() {
    const { firstName, lastName, identifier, password } = this.form.value;
    if (this.form.valid) {
      this._authService.signUp(firstName.trim(), lastName, identifier, password).subscribe(data => {
        const navigationExtras: NavigationExtras = { state: { data: 'Congratulations! An email for confirmation has been sent to your email address.' } };
        this.router.navigate(['login'], navigationExtras);
      },
        error => {

          let e = error;
          e = e.error ? e.error : e;
          e = e.error ? e.error : e;

          this.error = e.message || error.error.data[0].messages[0].message;

        }
      )
    }

  }
}
