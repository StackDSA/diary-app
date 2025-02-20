import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password).subscribe(
      response => {
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/']);
        } else {
          alert('Login failed!');
        }
      },
      error => {
        this.isLoading = false;
        alert('Please try again later.');
      }
    );
  }
}
