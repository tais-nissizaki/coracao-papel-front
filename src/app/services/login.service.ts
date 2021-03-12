import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(email: string, senha: string) {
    
  }

  loginAdministrador(email: string, senha: string): Observable<boolean> {
    return new Observable(subscriber => {
      subscriber.next(email === 'admin' && senha === 'admin');
    });
  }
}
