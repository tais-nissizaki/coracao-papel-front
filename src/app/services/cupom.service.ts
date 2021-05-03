import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  constructor(
    private authStorageService: AuthStorageService,
    private http: HttpClient
  ) { }

  verificarCupomValido(cupom: string, idCliente?: number): Observable<Cupom> {
    let url = 'http://localhost:8083/cupons';
    if(idCliente) {
      url += '/cliente/' + idCliente
    }
    url += '/' + cupom;
    return this.http.get<Cupom>(url);
  }

  obterCuponsCliente(dataInicial?: Date, dataFinal?: Date): Observable<CupomCliente[]> {
    const idCliente = this.authStorageService.obterDadosAutenticacao().idCliente;

    let params = {
      dataInicial: dataInicial.toLocaleDateString(),
      dataFinal: dataFinal.toLocaleDateString()
    };
    return this.http.get<CupomCliente[]>('http://localhost:8083/cupons/cliente/' + idCliente, {
      params: params
    });
  }
}
