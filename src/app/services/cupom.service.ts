import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  constructor(
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

  obterCuponsCliente(idCliente: number, dataInicial?: Date, dataFinal?: Date): Cupom[] {
    const fimCampanha = new Date();
    fimCampanha.setFullYear(fimCampanha.getFullYear() +1);
    return [
      {
        codigo: 'TROCA20',
        inicioCampanha: new Date(2020, 5, 1),
        utilizado: true,
        valor: 20,
        fimCampanha: new Date(2021, 5, 1),
      },
      {
        codigo: 'TROCA5585',
        inicioCampanha: new Date(),
        utilizado: false,
        valor: 55.85,
        fimCampanha: fimCampanha,
      },
    ]
  }
}
