import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  gravar(token: string) {
    localStorage.setItem('token', token);
  }

  remover() {
    localStorage.removeItem('token');
  }
}
