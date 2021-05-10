import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoComponent } from './produto/produto.component';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css']
})
export class ProdutosListaComponent implements OnInit {

  produtos: Produto[] = [];
  produtosQuantidadeReservado: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {
    this.produtoService.obterProdutos()
      .subscribe(produtos => {
        this.produtos = produtos
        this.carrinhoService.obterCarrinhosPorProduto('')
          .subscribe(carrinhos => {
            let produtosReservados: Produto[] = [];
            carrinhos.forEach(carrinho => {
              carrinho.itensCarrinho.forEach(itemCarrinho => {
                produtosReservados.find(p => p.id === itemCarrinho.produto.id);
    
                let p: Produto = produtosReservados.find(p => p.id === itemCarrinho.produto.id);
                if(!p) {
                  p = { ...itemCarrinho.produto, quantidadeEstoque: 0 };
                }
                p.quantidadeEstoque += itemCarrinho.quantidade;
                produtosReservados.push(p);
              })
            });
            this.produtosQuantidadeReservado = produtosReservados;
            
            this.produtos.forEach(prod => {
              console.log(prod)
              this.calcularQuantidadeDisponivel(prod)
            });
          });
        });
  }

  calcularQuantidadeDisponivel(produto: Produto) {
    const produtoEncontrado = this.produtosQuantidadeReservado.find(p => p.id == produto.id);
    if(!produtoEncontrado) {
      produto.quantidadeDisponivel = produto.quantidadeEstoque;
    } else {
      produto.quantidadeDisponivel = (produto.quantidadeEstoque - produtoEncontrado.quantidadeEstoque);
    }
  }

}
