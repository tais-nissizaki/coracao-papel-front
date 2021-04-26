import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartaoService } from '../../../../services/cartao.service';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.css']
})
export class CartoesComponent implements OnInit {

  @Input() valorTotal!: number;
  @Output() habilitarBotaoFinalizar: EventEmitter<boolean> = new EventEmitter();

  tiposCartao: TipoCartao[] = [];
  bandeirasCartao: BandeiraCartao[] = [];
  cartoes: Cartao[] = [];
  novoCartaoForm: FormGroup;
  adicionarNovoCartao = false;
  exibirSegundoCartao = false;

  formasPagamento: FormaPagamento[] = []

  constructor(
    formBuilder: FormBuilder,
    private cartaoService: CartaoService,
  ) {
    this.novoCartaoForm = formBuilder.group({
      tipoCartao: [null, Validators.required],
      bandeiraCartao: [null, Validators.required],
      numero: [null, Validators.required],
      cvv: [null, Validators.required],
      validade: [null, Validators.required],
      nomeImpresso: [null, Validators.required],
      desejaCadastrarCartao: [false]
    })
  }

  ngOnInit(): void {
    this.formasPagamento.push({cartao: null, valor: null} as FormaPagamento);
    this.cartaoService.obterTiposCartao().subscribe(tiposCartao => this.tiposCartao = tiposCartao);
    this.cartaoService.obterBandeirasCartao().subscribe(bandeirasCartao => this.bandeirasCartao = bandeirasCartao);
    this.cartaoService.obterCartoesCliente().subscribe(cartoes => {
      this.cartoes = cartoes.map(cartao => {
        return {
          ...cartao,
          validade: cartao.dataValidade.split('-')[1] + cartao.dataValidade.split('-')[0]
        }
      })
    });
  }

  selecionarNovoCartao() {
    this.formasPagamento.push({cartao: null, valor: null} as FormaPagamento);
  }

  salvarCartao() {
    this.novoCartaoForm.markAllAsTouched();
    if (this.novoCartaoForm.valid) {
      const cartao: Cartao = this.novoCartaoForm.value;
      this.cartoes.push(cartao);
      if(!this.formasPagamento.find(formaPagamento => formaPagamento.cartao)) {
        this.formasPagamento.find(formaPagamento => !formaPagamento.cartao).cartao = cartao;
      } else {
        this.formasPagamento.push({cartao: cartao, valor: null})
      }
      this.adicionarNovoCartao = false;
      this.novoCartaoForm.reset();
    }
  }

}
