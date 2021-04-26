import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartaoService } from '../../services/cartao.service';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.css']
})
export class CartaoComponent implements OnInit {

  editMode = false;
  cartaoCadastroFormGroup: FormGroup;
  currentIndex = -1;
  bandeiras: BandeiraCartao[] = [];
  tiposCartao: TipoCartao[] = [];
  cartoes: Cartao[] = [];
  colunasExibidas: string[] = ['bandeira', 'tipo', 'numero', 'validade', 'acoes'];
  
  @Output() sincronizarCartoes = new EventEmitter<Cartao[]>();

  constructor(
    formBuilder: FormBuilder,
    private cartaoService: CartaoService,
  ) {
    this.cartaoCadastroFormGroup = formBuilder.group({
      bandeiraCartao: [null, Validators.required],
      tipoCartao: [null, Validators.required],
      nomeImpresso: [null, Validators.required],
      numero: [null, Validators.required],
      cvv: [null, Validators.required],
      validade: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.cartaoService.obterBandeirasCartao()
      .subscribe(bandeiras => this.bandeiras = bandeiras);
      
    this.cartaoService.obterTiposCartao()
      .subscribe(tiposCartao => this.tiposCartao = tiposCartao);
  } 
  
  mascararNumero(numeroCartao: Number) {
    const numeroString = numeroCartao.toString();
    return 'XXXX XXXX XXXX ' + numeroString.substring(12);
  }

  formatarValidade(validade: string) {
    return validade.substring(0, 2) + '/' + validade.substring(2);
  }

  novo() {
    this.editMode = true;
    this.currentIndex = -1;
    this.cartaoCadastroFormGroup.clearValidators();
    this.cartaoCadastroFormGroup.reset();
  }
  cancelar() {
    this.editMode = false;
    this.currentIndex = -1;
    this.cartaoCadastroFormGroup.reset();
  }

  editarCartao(cartao: Cartao) {
    this.cartaoCadastroFormGroup.reset(cartao);
    this.editMode = true;
    this.currentIndex = this.cartoes.indexOf(cartao);
  }

  removerCartao(cartao: Cartao) {
    this.cartoes = this.cartoes.filter(enderecoLista => this.cartoes.indexOf(enderecoLista) != this.cartoes.indexOf(cartao));
    this.sincronizarCartoes.emit(this.cartoes);
  }
  
  adicionarCartao() {
    this.cartaoCadastroFormGroup.markAllAsTouched();
    if(this.cartaoCadastroFormGroup.valid) {
      if (this.currentIndex > -1) {
        this.cartoes = [
          ...this.cartoes.filter(enderecoLista => this.cartoes.indexOf(enderecoLista) != this.currentIndex),
          this.cartaoCadastroFormGroup.value
        ];
      } else {
        this.cartoes = [
          ...this.cartoes,
          this.cartaoCadastroFormGroup.value
        ];
      }
    }
    this.sincronizarCartoes.emit(this.cartoes);
    this.cancelar();

  }
}
