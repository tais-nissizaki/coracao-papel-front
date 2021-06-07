import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../../../services/carrinho.service';
import { CalcularFreteService } from '../../../services/calcular-frete.service';
import { CupomService } from '../../../services/cupom.service';
import { AuthStorageService } from '../../../services/auth-storage.service';
import { CartoesComponent } from './cartoes/cartoes.component';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  @ViewChild(CartoesComponent) cartoesComponent!: CartoesComponent;

  cupons: Cupom[] = []

  valorProdutos: number = 0;
  valorFrete: number = 15.95;

  cupomFormControl = new FormControl(null, [Validators.required]);
  carrinho: Carrinho;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private freteService: CalcularFreteService,
    private cupomService: CupomService,
    private authStorageService: AuthStorageService,
    private pedidoService: PedidoService
  ) {
  }

  ngOnInit(): void {
    this.carrinhoService
      .obterDadosCarrinho()
      .subscribe(carrinho => {
        carrinho.itensCarrinho.forEach(itemCarrinho => {
          this.valorProdutos += itemCarrinho.quantidade * itemCarrinho.produto.valor;
        });

        this.valorFrete = this.freteService.calcularFretePorEstado(carrinho.enderecoSelecionado.cidade.estado);
        this.carrinho = carrinho;
      });
  }

  ngAfterViewInit () {
    console.log(this.cartoesComponent.formasPagamento);
  }

  adicionarCupom() {
    if(!this.cupomFormControl.valid) {
      this.cupomFormControl.markAsTouched();
      return;
    }

    if(this.verificaCupomJaAdicionado(this.cupomFormControl.value)) {
      return;
    }

    if (!this.cupons.find(cupom => cupom.codigo.toLocaleLowerCase() == this.cupomFormControl.value.toLocaleLowerCase())) {
      this.cupomService.verificarCupomValido(this.cupomFormControl.value, this.authStorageService.obterDadosAutenticacao().idCliente)
        .subscribe(
          cupom => { // Integração com sucesso
            if(cupom) {
              if(!this.verificarCupomDescontoJaAdicionado(cupom) && !this.verificarCupomDescontoJaUtilizado(cupom)) {
                this.cupons = [
                  ...this.cupons,
                  cupom
                ]
                this.cupomFormControl.reset();
              }
            } else {
              this.cupomFormControl.setErrors({'invalido': 'Cupom inválido'})
            }
          },
          (error) => { // Erro na Integração
            console.error('Erro ao validar o Cupom', error);
            alert('Erro ao aplicar cupom')
          }
        );
    } else {
      this.cupomFormControl.setErrors({'ja_informado': 'Cupom já informado'})
    }
  }

  verificaCupomJaAdicionado(cupomRecebido: string) {
    if (this.cupons.find(cupom => cupom.codigo.toLocaleLowerCase() == cupomRecebido.toLocaleLowerCase())) {
      this.cupomFormControl.setErrors({'ja_informado': 'Cupom já informado'})
    }
    return this.cupomFormControl.errors;
  }

  verificarCupomDescontoJaAdicionado(cupomRecebido: Cupom) {
    if (cupomRecebido.percentual) {
      if(this.cupons.find(cupom => cupom.codigo.toLocaleLowerCase() != cupomRecebido.codigo.toLocaleLowerCase() && cupom.percentual)) {
        this.cupomFormControl.setErrors({'ja_existe_cupom_promo': 'Já foi informado um cupom promocional'})
      }
    }
    return this.cupomFormControl.errors;
  }

  verificarCupomDescontoJaUtilizado(cupomRecebido: Cupom) {
    if (cupomRecebido.cliente && cupomRecebido.cliente.utilizado) {
      this.cupomFormControl.setErrors({'cupom_ja_utilizado': 'Cupom já utilizado'})
    }
    return this.cupomFormControl.errors;
  }

  finalizarPedido() {
    if(this.cartoesComponent && this.cartoesComponent.formasPagamento) {
      let formularioInvalido = false;
      let valoresPagamentoInformado = 0;
      this.cartoesComponent.formasPagamento.forEach(formaPagamento => {
        if(formaPagamento.cartao && (formaPagamento.valor || 0) <= 0) {
          formularioInvalido = true;
        }
        if(!formaPagamento.cartao && (formaPagamento.valor || 0) > 0) {
          formularioInvalido = true;
        }
        valoresPagamentoInformado += Number((formaPagamento.valor || 0));
      })
      if(formularioInvalido) {
        alert('Revise as informações de pagamento');
      } else if(Math.round(valoresPagamentoInformado * 100) / 100 != Math.round(this.total * 100) / 100) {
        alert('Os valores informados nos dados de pagamento não somam o valor total do pedido');
      } else {
        this.pedidoService.efetuarPedido(this.carrinho, this.cartoesComponent.formasPagamento, this.cupons, this.total, this.valorFrete)
          .subscribe(mensagem => {
            if(mensagem && mensagem.includes('Erro')) {
              alert(mensagem);
            } else {
              this.carrinhoService.excluirCarrinho()
              .subscribe((mensagemCarrinho) => {
                console.log(mensagemCarrinho);
                this.carrinhoService.excluirCarrinhoLocal()
                this.router.navigateByUrl('/pedido-realizado/' + mensagem);
              });
            }
          });
      }
    }
  }

  get total() {
    let valorTrocas = 0;
    this.cupons.forEach(cupom => valorTrocas += cupom.valor ? cupom.valor : 0);

    const cupomDesconto = this.cupons.find(cupom => cupom.percentual && cupom.percentual > 0);
    let valorDesconto = 0;
    if(cupomDesconto?.percentual || 0 > 0) {
      valorDesconto = Math.round(this.valorProdutos * (cupomDesconto.percentual/100) * 100) / 100;
    }
    return this.valorProdutos - valorDesconto - valorTrocas + this.valorFrete;
  }

}
