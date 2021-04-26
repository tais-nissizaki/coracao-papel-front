import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto.service';
import { JustificativaInativacaoComponent } from './justificativa-inativacao/justificativa-inativacao.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {


  produtos: Produto[] = [];
  filtroTitulo: string = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.obterProdutos();
  }

  novo() {
    this.router.navigateByUrl('/administrador/produtos/cadastro');
  }

  pesquisar() {
    console.log(this.filtroTitulo)
    // this.produtoService.pesquisarProduto({titulo: this.filtroTitulo}).subscribe(
    //   (retorno) => {
    //     console.log(retorno);
    //     this.produtos = retorno;
    //   }
    // );
    this.produtos=this.produtoService.pesquisarProduto({titulo: this.filtroTitulo,autor: '',valor: 0, caminhoImagem: ''});
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

}
