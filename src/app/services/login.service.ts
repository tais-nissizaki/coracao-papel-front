import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(login: Login): Observable<DadosUsuario> {
    return this.httpClient.post<DadosUsuario>("http://localhost:8083/login", {
      nomeUsuario: login.email,
      senha: login.senha
    });
  }

  loginAdministrador(loginAdministrado: LoginAdministrador): Observable<DadosUsuario> {
    // return new Observable(subscriber => {
    //   subscriber.next(email === 'admin' && senha === 'admin');
    // });
    
    return this.httpClient.post<DadosUsuario>("http://localhost:8083/login", {
      nomeUsuario: loginAdministrado.usuario,
      senha: loginAdministrado.senha
    });
  }
}
