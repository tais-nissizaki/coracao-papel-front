import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthStorageService } from '../../services/auth-storage.service';
import { CarrinhoService } from '../../services/carrinho.service';


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
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authStorageService: AuthStorageService,
    private carrinhoService: CarrinhoService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  abrirTelaCadastro() {
    this.router.navigateByUrl('/cadastro').then(value => console.log).catch(err => console.error);
  }

  login() {
    this.loginForm.controls.email.setErrors(null)
    this.loginForm.controls.senha.setErrors(null)
    this.loginForm.controls.email.markAsTouched();
    this.loginForm.controls.senha.markAsTouched();
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe(
          dadosUsuario => {
            if(dadosUsuario && dadosUsuario.permissoes && dadosUsuario.permissoes.length > 0 && dadosUsuario.permissoes.includes("CLIENTE")) {
              this.authStorageService.guardarDadosAutenticacao(dadosUsuario, this.loginForm.value);
              this.router.navigateByUrl('/');
              this.carrinhoService.excluirCarrinhoLocal();
            } else {
              this.loginForm.controls.email.setErrors({'erro_login': 'Ocorreu um erro ao tentar efetuar o login'});
              this.loginForm.controls.senha.setErrors({'erro_login': 'Ocorreu um erro ao tentar efetuar o login'});
            }
          },
          () => {
            this.loginForm.controls.email.setErrors({'usuario_senha_invalido': 'Usuário e/ou senha inválidos'});
            this.loginForm.controls.senha.setErrors({'usuario_senha_invalido': 'Usuário e/ou senha inválidos'});
          }
        )
    }
  }
}
