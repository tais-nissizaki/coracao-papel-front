import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {

  constructor() { }

  obterCategoriasProduto(): CategoriaProduto[] {
    return [
      {
        id: 1,
        nome: 'FICCAO',
        descricao: 'Ficção',
      },
      {
        id: 2,
        nome: 'AVENTURA',
        descricao: 'Aventura',
      },
      {
        id: 3,
        nome: 'ROMANCE',
        descricao: 'Romance',
      },
      {
        id: 4,
        nome: 'TERROR',
        descricao: 'Terror',
      },
      {
        id: 5,
        nome: 'INFANTIL',
        descricao: 'Infantil',
      }
    ]
  }
  
}
