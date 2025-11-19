import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, hasValidationErrors } from '../../Services/_index';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginSub: Subscription[] = [];

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initilizeLoginForm();
  }

  initilizeLoginForm() {
    this.loginForm = this.fb.group({
      userName: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  handleError(controlName: string) {
    return hasValidationErrors(this.loginForm, controlName);
  }

  submitLoginForm(frm: FormGroup) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let loginSubService = this.authService.ValidateUser(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          debugger
          // console.log(res);
          alert('Login Sucessful !!');
          // data store in localstorage
          this.authService.setAuthUser(res);
          // Navigate
          this.router.navigateByUrl('/home/databinding').then(() => window.location.reload);
        }
      },
      error: () => {

      },
      complete: () => {

      }
    })
    this.loginSub.push(loginSubService);
    console.log("Login Form Value", this.loginForm.value);
  }

  ngOnDestroy(): void {
    this.loginSub.forEach(res => res.unsubscribe());
  }

}
