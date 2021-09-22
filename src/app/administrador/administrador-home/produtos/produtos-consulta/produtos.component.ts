import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';
import { ProdutoService } from '../../../../services/produto.service';
import { JustificativaInativacaoComponent } from './justificativa-inativacao/justificativa-inativacao.component';
import { JustificativaInativacaoData } from './justificativa-inativacao/justificativa.modal.data';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  colunasItemEstoque = ['titulo', 'autor', 'grupo-precificacao', 'quantidade', 'quantidade-disponivel', 'status', 'acao']
  produtos: Produto[] = [];
  produtosQuantidadeReservado: Produto[] = [];
  categorias: CategoriaProduto[] = [];
  filtroTitulo: string = '';
  filtroAutor: string = '';
  filtroCategoria: CategoriaProduto = {} as CategoriaProduto;
  filtroISBN: string = '';
  filtroEditora: string = '';
  filtroCodigoBarra: string = '';

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    public dialog: MatDialog,
    private categoriaProdutoService: CategoriaProdutoService,
  ) { }

  ngOnInit(): void {
    this.categorias = this.categoriaProdutoService.obterCategoriasProduto();
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
    this.produtoService.filtrarProdutos(this.filtroTitulo, this.filtroCategoria.id, this.filtroAutor, this.filtroISBN, this.filtroEditora, this.filtroCodigoBarra)
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

    const dialogRef = this.dialog.open(JustificativaInativacaoComponent, {
      data: {
        inativacao: produto.ativo,
        produto:produto
      }
    });

    dialogRef.afterClosed().subscribe((result: JustificativaInativacaoData) => {
      if (result) {
        if(produto.ativo) {
          this.produtoService.inativarProduto(produto).subscribe(
            (retorno) => {
              alert(retorno);
              if(!retorno || !retorno.includes('Erro')) {
                this.pesquisar();
              }
            }
          );
        } else {
          this.produtoService.ativarProduto(produto).subscribe(
            (retorno) => {
              alert(retorno);
              this.pesquisar();
            }
          );
        }
      }
      console.log('The dialog was closed', result);
    });
  }

  calcularQuantidadeDisponivel(produto: Produto): number {
    return produto.quantidadeEstoque - (this.produtosQuantidadeReservado.find(p => p.id === produto.id)?.quantidadeEstoque || 0)
  }

}
