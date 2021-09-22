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

  salvarCartao(cartao: Cartao) {
    const { idCliente } = this.authStorageService.obterDadosAutenticacao();
    return this.http.post(
      'http://localhost:8083/cartoes/cliente/' + idCliente,
      {
        ...cartao,
        dataValidade: this.formatarDataValidadeCartao(cartao.validade),
      },
      {
        responseType: 'text',
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  alterarCartao(cartao: Cartao) {
    const { idCliente } = this.authStorageService.obterDadosAutenticacao();
    return this.http.put(
      'http://localhost:8083/cartoes/cliente/' + idCliente,
      {
        ...cartao,
        dataValidade: this.formatarDataValidadeCartao(cartao.validade),
      },
      {
        responseType: 'text',
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  inativarCartao(cartao: Cartao) {
    const { idCliente } = this.authStorageService.obterDadosAutenticacao();
    return this.http.put(
      'http://localhost:8083/cartoes/cliente/' + idCliente + '/cartao/' + cartao.id, 
      {},
      {
        responseType: 'text',
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

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

  private formatarDataValidadeCartao(validade: string) {
    if(validade) {
      const v = validade.replace(/\D/g, '');
      if(v.length > 6) {
        return v.substring(0, 4) + '-' +v.substring(4, 6) + '-01';
      } else {
        return validade.substring(2) + '-' +validade.substring(0,2) + '-01T00:00:00.000-03:00';
      }

    } else {
      return validade;
    }
  }
}
