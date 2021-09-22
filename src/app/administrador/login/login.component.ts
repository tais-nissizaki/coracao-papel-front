import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthStorageService } from '../../services/auth-storage.service';

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
    private loginService: LoginService,
    private authStorageService: AuthStorageService) {
    this.loginForm = this.formBuilder.group({
      usuario: [this.loginData.usuario, [Validators.required]],
      senha: [this.loginData.senha, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      const loginData : LoginAdministrador = {
        usuario: this.loginForm.value.usuario, 
        senha: this.loginForm.value.senha
      };
      this.loginService.loginAdministrador(loginData)
        .subscribe(
          (dadosUsuario) => {
            if(dadosUsuario && dadosUsuario.permissoes && dadosUsuario.permissoes.length > 0 && dadosUsuario.permissoes.includes("ADMIN")) {
              this.authStorageService.guardarDadosAutenticacao(dadosUsuario, loginData);
              this.router.navigateByUrl('/administrador');
            } else {
              alert('Usuário e senha inválidos');
            }
          },
          () => alert('Usuário e senha inválidos')
        )
    }
  }

}
