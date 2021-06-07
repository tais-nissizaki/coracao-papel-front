import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-itens-carrinho',
  templateUrl: './itens-carrinho.component.html',
  styleUrls: ['./itens-carrinho.component.css']
})
export class ItensCarrinhoComponent implements OnInit {

  @Input() itensCarrinho!: ItemCarrinho[];
  
  @Output() adicionarQuantidadeEmitter: EventEmitter<ItemCarrinho> = new EventEmitter();
  @Output() reduzirQuantidadeEmitter: EventEmitter<ItemCarrinho> = new EventEmitter();
  @Output() removerItemEmitter: EventEmitter<ItemCarrinho> = new EventEmitter();
  @Output() alterarQuantidadeEmitter: EventEmitter<ItemCarrinho> = new EventEmitter();

  colunasExibidas = ['Produto', 'Qtd', 'acoes', 'Valor']

  constructor() { }

  ngOnInit(): void {
  }

  adicionarQuantidade(itemCarrinho: ItemCarrinho, somador: number) {
    itemCarrinho.quantidade += somador
    if(somador > 0) {
      this.adicionarQuantidadeEmitter.emit(itemCarrinho);
    } else {
      this.reduzirQuantidadeEmitter.emit(itemCarrinho);
    }

  }

  removerItem(itemCarrinho: ItemCarrinho) {
    this.itensCarrinho = this.itensCarrinho.filter(itemCarrinhoLista => itemCarrinhoLista != itemCarrinho);
    this.removerItemEmitter.emit(itemCarrinho);
  }

  alterarQuantidade(itemCarrinho: ItemCarrinho, $event: Event) {
    console.log($event);
    this.alterarQuantidadeEmitter.emit(itemCarrinho);
  }

  changeTest(itemCarrinho: ItemCarrinho) {
    console.log(itemCarrinho);
  }

  get valorTotalProdutos() {
    return this.itensCarrinho.map(itemCarrinho => itemCarrinho.quantidade * itemCarrinho.produto.valor)
    .reduce((sum, actual) => sum += actual) || 0;
  }

}
