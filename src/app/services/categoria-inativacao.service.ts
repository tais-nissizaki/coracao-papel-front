import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaInativacaoService {

  constructor() { }

  private categoriasInativacao: CategoriaInativacao[] = [
    {
      id: 1,
      nome: 'FORA_MERCADO',
      descricao: 'Fora de Mercado',
      isInativacao: true
    },
    {
      id: 2,
      nome: 'REENTRADA_ESTOQUE',
      descricao: 'Reentrada de estoque',
      isInativacao: false
    },
    {
      id: 3,
      nome: 'SEM_ESTOQUE',
      descricao: 'Sem estoque',
      isInativacao: true
    },
  ];

  obterJustificativas(inativacao: boolean): CategoriaInativacao[] {
    return this.categoriasInativacao.filter(categoria => categoria.isInativacao == inativacao);
  }
}
