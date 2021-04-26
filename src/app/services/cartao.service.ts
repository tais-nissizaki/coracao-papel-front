import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) { }

  obterTiposCartao(): Observable<TipoCartao[]> {
    return this.http.get<TipoCartao[]>('http://localhost:8083/tipos-cartao');
  }

  obterBandeirasCartao(): Observable<BandeiraCartao[]> {
    return this.http.get<BandeiraCartao[]>('http://localhost:8083/bandeiras-cartao');
  }

  obterCartoesCliente(): Observable<Cartao[]> {
    const { idCliente } = this.authStorageService.obterDadosAutenticacao();
    if (!idCliente) {
      return of([]);
    }
    return this.http.get<Cartao[]>('http://localhost:8083/cartoes/cliente/' + idCliente);
  }
}
