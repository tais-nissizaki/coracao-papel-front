import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutoService } from '../../../../services/produto.service';
import { JustificativaInativacaoComponent } from './justificativa-inativacao/justificativa-inativacao.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  colunasItemEstoque = ['titulo', 'autor', 'grupo-precificacao', 'quantidade', 'quantidade-disponivel', 'acao']
  produtos: Produto[] = [];
  produtosQuantidadeReservado: Produto[] = [];
  filtroTitulo: string = '';

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.produtoService.filtrarProdutos('')
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
          });
      });
  }

  novo() {
    this.router.navigateByUrl('/administrador/produtos/cadastro');
  }

  pesquisar() {
    this.produtoService.filtrarProdutos(this.filtroTitulo)
      .subscribe(produtos => {
        this.produtos = produtos
        this.carrinhoService.obterCarrinhosPorProduto(this.filtroTitulo)
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
            });
      });
    
  }

  editar(produto: Produto) {
    this.router.navigateByUrl(`/administrador/produtos/cadastro/${produto.id}`)
  }

  ativarInativar(produto: Produto) {
    console.log(produto);
    // if(produto.ativo) {
    //   this.produtoService.inativarProduto(produto).subscribe(
    //     (retorno) => {
    //       alert(retorno);
    //       this.pesquisar();
    //     }
    //   );
    // } else {
    //   this.produtoService.ativarProduto(produto).subscribe(
    //     (retorno) => {
    //       alert(retorno);
    //       this.pesquisar();
    //     }
    //   );
    // }

    const dialogRef = this.dialog.open(JustificativaInativacaoComponent, {
      data: {
        inativacao: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  calcularQuantidadeDisponivel(produto: Produto): number {
    return produto.quantidadeEstoque - (this.produtosQuantidadeReservado.find(p => p.id === produto.id)?.quantidadeEstoque || 0)
  }

}
