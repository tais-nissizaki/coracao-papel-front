import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor() { }

  clientesObterQuantidadePorEstado(): Observable<QuantidadePorEstado[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {estado: {id: 12, descricao: 'AC'}, quantidade: 1},
        {estado: {id: 27, descricao: 'AL'}, quantidade: 1},
        {estado: {id: 13, descricao: 'AM'}, quantidade: 1},
        {estado: {id: 16, descricao: 'AP'}, quantidade: 1},
        {estado: {id: 29, descricao: 'BA'}, quantidade: 1},
        {estado: {id: 23, descricao: 'CE'}, quantidade: 1},
        {estado: {id: 53, descricao: 'DF'}, quantidade: 1},
        {estado: {id: 32, descricao: 'ES'}, quantidade: 1},
        {estado: {id: 52, descricao: 'GO'}, quantidade: 1},
        {estado: {id: 21, descricao: 'MA'}, quantidade: 1},
        {estado: {id: 31, descricao: 'MG'}, quantidade: 1},
        {estado: {id: 50, descricao: 'MS'}, quantidade: 1},
        {estado: {id: 51, descricao: 'MT'}, quantidade: 1},
        {estado: {id: 15, descricao: 'PA'}, quantidade: 1},
        {estado: {id: 25, descricao: 'PB'}, quantidade: 1},
        {estado: {id: 26, descricao: 'PE'}, quantidade: 1},
        {estado: {id: 22, descricao: 'PI'}, quantidade: 1},
        {estado: {id: 41, descricao: 'PR'}, quantidade: 89},
        {estado: {id: 33, descricao: 'RJ'}, quantidade: 53},
        {estado: {id: 24, descricao: 'RN'}, quantidade: 1},
        {estado: {id: 11, descricao: 'RO'}, quantidade: 1},
        {estado: {id: 14, descricao: 'RR'}, quantidade: 1},
        {estado: {id: 43, descricao: 'RS'}, quantidade: 24},
        {estado: {id: 42, descricao: 'SC'}, quantidade: 12},
        {estado: {id: 28, descricao: 'SE'}, quantidade: 1},
        {estado: {id: 35, descricao: 'SP'}, quantidade: 143},
        {estado: {id: 17, descricao: 'TO'}, quantidade: 1},
      ]);
    });
  }
}
