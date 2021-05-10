import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
  ) { }

  efetivarCompra(compra: Compra) {
    return this.http.post<string>('http://localhost:8083/compras', compra, {
      headers: {
        'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
      },
    })
  }
}
