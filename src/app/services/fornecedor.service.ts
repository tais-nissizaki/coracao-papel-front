import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor() { }

  obterFornecedores(): Observable<Fornecedor[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          cnpj: '84159269000105',
          razaoSocial: 'Lavínia e Henrique ME',
          nomeFantasia: 'LavHenrique Livos',
        },
        {
          cnpj: '76883007000160',
          razaoSocial: 'Larissa e Enrico Ltda',
          nomeFantasia: 'Rico livros e revistas',
        },
        {
          cnpj: '73956814000178',
          razaoSocial: 'Simone e Eloá Ltda',
          nomeFantasia: 'Elo livros técnicos',
        },
        {
          cnpj: '06974221000147',
          razaoSocial: 'Pedro Henrique e Marlene ME',
          nomeFantasia: 'Pedra fillosofal livros',
        }
      ])
    });
  }

}
