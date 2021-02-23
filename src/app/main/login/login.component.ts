import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginData: Login = {
    email: '',
    senha: '',
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,) {
    this.loginForm = this.formBuilder.group({
      email: [this.loginData.email, [Validators.required]],
      senha: [this.loginData.senha, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  abrirTelaCadastro() {
    this.router.navigateByUrl('/cadastro').then(value => console.log).catch(err => console.error);
  }
}
