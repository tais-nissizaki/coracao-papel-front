import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {
    this.produto = this.produtoService.produtoDetalhe;
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.produtoService.obterProduto(Number(params.get('id')))
          .subscribe(produtos => {
            this.produto = produtos[0];
            
            this.carrinhoService.obterCarrinhosPorProduto(this.produto.titulo)
            .subscribe(carrinhos => {
              let produtosReservados: Produto[] = [];
              const carrinhosUnicos: Carrinho[] = [];
              carrinhos.forEach((carrinho) => {
                if(carrinhosUnicos.findIndex(c => c.id == carrinho.id) < 0) {
                  carrinhosUnicos.push(carrinho);
                }
              });
              carrinhosUnicos.forEach(carrinho => {
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
              
              produtosReservados.forEach(prod => {
                this.calcularQuantidadeDisponivel(prod)
              });
            });
          });
      }
    });
  }
  
  adicionarCarrinho(produto: Produto) {
    this.carrinhoService.adicionarProduto(produto)
      .subscribe(carrinho => {
        this.router.navigateByUrl('/carrinho');
      });
  }

  calcularQuantidadeDisponivel(produto: Produto) {
    if(this.produto.id !=  produto.id) {
      this.produto.quantidadeDisponivel = produto.quantidadeEstoque;
    } else {
      this.produto.quantidadeDisponivel = (this.produto.quantidadeEstoque - produto.quantidadeEstoque);
    }
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
