import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private carrinho: Carrinho = {
    produtos: [],
    entrega: {},
  };

  constructor() {
  }

  adicionarProduto(produto: Produto) {

  }
}