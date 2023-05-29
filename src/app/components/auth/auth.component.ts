import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from 'src/app/interfaces/login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginError: string = '';

  loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    password: ['', [Validators.required]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private loginService: LoginService
    ){

  }

  ngOnInit(): void {

  }

  get usuario() {
    return this.loginForm.controls.usuario;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);

        },
        error: (errorData) => {
          this.loginError = errorData;
        },
        complete: () => {
          this.router.navigateByUrl('/home');
          this.loginForm.reset();

        }
      });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
