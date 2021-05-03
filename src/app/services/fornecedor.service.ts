import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) { }

  obterFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>('http://localhost:8083/fornecedores',{
      headers: {
        'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
      },
    });
  }

}
