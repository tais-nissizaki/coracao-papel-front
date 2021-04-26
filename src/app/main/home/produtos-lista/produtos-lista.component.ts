import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css']
})
export class ProdutosListaComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
  ) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.obterProdutos();
  }

}
