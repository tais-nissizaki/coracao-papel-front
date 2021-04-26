import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {

  produto: Produto;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {
    this.produto = this.produtoService.produtoDetalhe;
  }
  adicionarCarrinho(produto: Produto) {
    this.carrinhoService.adicionarProduto(produto);
    this.router.navigateByUrl('/carrinho');
  }
}
