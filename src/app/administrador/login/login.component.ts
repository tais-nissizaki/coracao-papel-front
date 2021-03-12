import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginData: LoginAdministrador = {
    usuario: '',
    senha: '',
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      usuario: [this.loginData.usuario, [Validators.required]],
      senha: [this.loginData.senha, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.loginAdministrador(this.loginForm.value.usuario, this.loginForm.value.senha)
        .subscribe((retorno) => {
          if(retorno) {
            this.router.navigateByUrl('/administrador');
          } else {
            alert('Usuário e senha inválidos');
          }
        })
    }
  }

}
