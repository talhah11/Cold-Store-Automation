import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _errorService: ErrorService
  ) {

    this.autoLogin()
  }
  user: any;
  signIn(identifier, password) {
    const formData = new FormData();
    formData.append('identifier', identifier);
    formData.append('password', password);
    return this.http.post<any>(`auth/local`, formData).pipe(
      catchError((error) => {
        return this._errorService.handleError(error, 'AuthFailed');
      })
    );
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  refreshInfo() {
    this.me().subscribe(userinfo => {
      const user = JSON.parse(localStorage.getItem("user"));
      user.user = userinfo;
      this.setUser(user);
    })
  }

  autoLogin() {
    const txt = localStorage.getItem('user');
    if (txt) {
      const user = JSON.parse(txt);
      if (!user) {
        return;
      }
      this.setUser(user);
    }
  }

  signOut() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['']);
  }

  forgotPassword(email) {
    const formData = new FormData();
    formData.append('email', email);
    return this.http.post<any>(`auth/forgot-password`, formData).pipe(
      catchError((Users) => {
        return this._errorService.handleError(Users);
      })
    );
  }

  resetPassword(code, newPassword, confirmNewPassword) {
    const formData = new FormData();
    formData.append('code', code);
    formData.append('password', newPassword);
    formData.append('passwordConfirmation', confirmNewPassword);
    return this.http.post<any>(`auth/reset-password`, formData);
  }

  signUp(firstName, lastName, email, password) {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', email);
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post<any>(`auth/local/register`, formData);
  }

  me() {
    return this.http.get('users/me');
  }

  dashboard() {
    return this.http.get('users/my/dashboard');
  }
  
}
