import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcularFreteService {

  constructor() { }

  private readonly TABELA_FRETE = [
    { estado: 'RO', valor: 10.77},
    { estado: 'AC', valor: 12.62},
    { estado: 'AM', valor: 16.12},
    { estado: 'RR', valor: 17.00},
    { estado: 'PA', valor: 20.35},
    { estado: 'AP', valor: 20.46},
    { estado: 'TO', valor: 18.79},
    { estado: 'MA', valor: 10.86},
    { estado: 'PI', valor: 24.19},
    { estado: 'CE', valor: 14.82},
    { estado: 'RN', valor: 16.63},
    { estado: 'PB', valor: 13.20},
    { estado: 'PE', valor: 15.97},
    { estado: 'AL', valor: 14.43},
    { estado: 'SE', valor: 18.41},
    { estado: 'BA', valor: 17.76},
    { estado: 'MG', valor: 11.87},
    { estado: 'ES', valor: 22.51},
    { estado: 'RJ', valor: 21.23},
    { estado: 'SP', valor: 9.90},
    { estado: 'PR', valor: 13.28},
    { estado: 'SC', valor: 11.44},
    { estado: 'RS', valor: 10.77},
    { estado: 'MS', valor: 18.83},
    { estado: 'MT', valor: 16.37},
    { estado: 'GO', valor: 20.03},
    { estado: 'DF', valor: 15.02},
  ]

  calcularFretePorEstado(estado: Estado): number {
    return this.calcularFretePorSiglaEstado(estado.descricao);
  }

  calcularFretePorSiglaEstado(siglaEstado: string): number {
    return this.TABELA_FRETE.find(frete => frete.estado === siglaEstado).valor || 0;
  }
  
}
