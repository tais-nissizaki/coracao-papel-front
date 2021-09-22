import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() cartoes?: Cartao[] = [];
  @Input() alteracaoCadastro?: boolean;
  colunasExibidas: string[] = ['bandeira', 'tipo', 'numero', 'validade', 'acoes'];
  
  @Output() sincronizarCartoes = new EventEmitter<Cartao[]>();

  constructor(
    formBuilder: FormBuilder,
    private cartaoService: CartaoService,
  ) {
    this.cartaoCadastroFormGroup = formBuilder.group({
      id: [null],
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

  equalObject(option1: any, option2: any) {
    return option2 && option1 && option1.id == option2.id; 
  }
  
  mascararNumero(numeroCartao: Number) {
    const numeroString = numeroCartao.toString();
    return 'XXXX XXXX XXXX ' + numeroString.substring(12);
  }

  formatarValidade(validade: string) {
    if(validade) {
      const v = validade.replace(/\D/g, '');
      if(v.length > 6) {
        const d = new Date(validade);
        return v.substring(4, 6) + '/' + v.substring(0, 4);
      } else {
        return validade.substring(0, 2) + '/' + validade.substring(2);
      }
    } else {
      return '';
    }
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

  private formatarValidadeCartao(dataValidade: string) {
    dataValidade = dataValidade.replace(/\D/g, '')
    if (dataValidade.length < 7) {
      return dataValidade;
    } else {
      return dataValidade.substring(4, 6) + dataValidade.substring(0, 4);
    }
  }

  editarCartao(cartao: Cartao) {
    this.cartaoCadastroFormGroup.reset({
      ...cartao,
      validade: this.formatarValidadeCartao(cartao.dataValidade || cartao.validade)
    });
    this.editMode = true;
    this.currentIndex = this.cartoes.indexOf(cartao);
  }

  removerCartao(cartao: Cartao) {
    if(this.alteracaoCadastro) {
      // inativarCartao
      this.cartaoService
        .inativarCartao(cartao)
        .subscribe(retorno => {
          if (retorno && retorno.includes('Erro')) {
            alert(retorno);
          } else {
            alert(retorno);
            this.cartoes = this.cartoes.filter(enderecoLista => this.cartoes.indexOf(enderecoLista) != this.cartoes.indexOf(cartao));
          }
          this.sincronizarCartoes.emit(this.cartoes);
        });
    } else {
      this.cartoes = this.cartoes.filter(enderecoLista => this.cartoes.indexOf(enderecoLista) != this.cartoes.indexOf(cartao));
      this.sincronizarCartoes.emit(this.cartoes);
    }

  }
  
  adicionarCartao() {
    this.cartaoCadastroFormGroup.markAllAsTouched();
    if(this.cartaoCadastroFormGroup.valid) {
      if (this.alteracaoCadastro) {
        this.adicionarCartaoAlteracaoCadastro();
      } else {
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
        this.sincronizarCartoes.emit(this.cartoes);
        this.cancelar();
      }
    }
  }

  adicionarCartaoAlteracaoCadastro() {
    if (this.currentIndex > -1) {
      this.cartaoService.alterarCartao(this.cartaoCadastroFormGroup.value)
      .subscribe(retorno => {
        if (retorno && retorno.includes('Erro')) {
          alert(retorno);
        } else {
          alert(retorno);
          this.cartoes = [
            ...this.cartoes.filter(enderecoLista => this.cartoes.indexOf(enderecoLista) != this.currentIndex),
            this.cartaoCadastroFormGroup.value
          ];
          this.sincronizarCartoes.emit(this.cartoes);
          this.cancelar();
        }
      })
    } else {
      this.cartaoService.salvarCartao(this.cartaoCadastroFormGroup.value)
        .subscribe(retorno => {
          if (retorno && retorno.includes('Erro')) {
            alert(retorno);
          } else {
            alert(retorno);
            this.cartoes = [
              ...this.cartoes,
              this.cartaoCadastroFormGroup.value
            ];
            this.sincronizarCartoes.emit(this.cartoes);
            this.cancelar();
          }
        })
    }
  }
}
