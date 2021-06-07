import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EnderecoService } from 'src/app/services/endereco.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  carrinho: Carrinho = { itensCarrinho: []};
  endereco?: Endereco;
  enderecosCliente: Endereco[] = [];

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private enderecoService: EnderecoService,
  ) {}

  ngOnInit(): void {
    this.carrinhoService.obterDadosCarrinho()
      .subscribe(carrinho => {
        this.carrinho = carrinho ? carrinho : { itensCarrinho: [] }
    
        this.enderecoService
          .obterEnderecosCliente({id: 1} as TipoEndereco)
          .subscribe(enderecos => {
            this.enderecosCliente = [...this.carrinhoService.adicionarEnderecosAoCarrinho(enderecos)]
          });
      });
  }

  pagamento() {
    if (this.endereco) {
      this.carrinhoService.adicionarEnderecosAoCarrinho([this.endereco]);
      this.router.navigateByUrl('/pagamento');
    } else {
      alert('Selecione um endereço ou cadastre um novo endereço para entrega')
    }
  }

  adicionarEndereco(endereco: Endereco) {
    this.enderecosCliente = [...this.carrinhoService.adicionarEnderecosAoCarrinho([endereco])];
  }

  selecionarEndereco(endereco: Endereco) {
    this.carrinhoService.selecionarEndereco(endereco);
    this.endereco = endereco;
  }

  adicionarQuantidade(itemCarrinho: ItemCarrinho) {
    this.carrinhoService.adicionarQuantidade(itemCarrinho)
      .pipe(
        finalize(() => this.carrinho = this.carrinhoService.obterCarrinhoLocal())
      )
      .subscribe(
        (retorno) => console.log('Retorno: ', retorno),
        (error) => this.tratarErro(error)
      );
  }

  reduzirQuantidade(itemCarrinho: ItemCarrinho) {
    this.carrinhoService.reduzirQuantidade(itemCarrinho)
    .pipe(
      finalize(() => this.carrinho = this.carrinhoService.obterCarrinhoLocal())
    )
    .subscribe(
      (retorno) => console.log('Retorno: ', retorno),
      (error) => this.tratarErro(error)
    );
  }

  alterarQuantidade(itemCarrinho: ItemCarrinho) {
    this.carrinhoService.alterarQuantidade(itemCarrinho)
    .pipe(
      finalize(() => this.carrinho = this.carrinhoService.obterCarrinhoLocal())
    )
    .subscribe(
      (retorno) => console.log('Retorno: ', retorno),
      (error) => this.tratarErro(error)
    );
  }

  tratarErro(error: any) {
    console.error('Erro: ', error);
    if (error.status == 423) {
      alert("Não existe estoque disponível para a quantidade solicitada.")
    }
  }

  removerItem(itemCarrinho: ItemCarrinho) {
    this.carrinhoService.removerItem(itemCarrinho)
    .subscribe(console.log);
  }

}
