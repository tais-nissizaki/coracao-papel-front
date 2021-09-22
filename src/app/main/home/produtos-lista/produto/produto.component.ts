import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @Input() produto!: Produto;
  @Input() index!: number;
  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private produtoSerice: ProdutoService,
  ) { }

  ngOnInit(): void {
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService
      .adicionarProduto(produto)
      .subscribe(carrinho => {
        this.router.navigateByUrl('/carrinho');
      });
  }

  detalhes($event, produto: Produto) {
    $event.preventDefault();
    this.produtoSerice.produtoDetalhe = produto;
    this.router.navigateByUrl('/produto/'+produto.id);
  }

  get btnAdicionarCarrinhoClass(): string {
    return 'btn-add-carrinho-'+this.index;
  }

  get imageBase64EncodedString(): string {
    if(!this.produto.imagem) {
      return '/assets/sem_imagem.png'
    } else if(this.produto.imagem.includes('data:image') && this.produto.imagem.includes('base64')) {
      return this.produto.imagem;
    } else {
      return 'data:image/jpeg;base64,'+this.produto.imagem;
    }
  }
}
