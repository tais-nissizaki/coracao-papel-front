import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from '../../services/endereco.service';
import { VerificaEnderecoCobrancaValidation } from '../../validations/existe-endereco-cobranca.validation';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  colunasExibidas: string[] = ['logradouro', 'numero', 'tipoEndereco', 'cidade', 'estado', 'acoes'];
  enderecos: Endereco[] = [];
  @Output() sincronizarEnderecos = new EventEmitter();

  editMode = false;
  enderecoCadastroFormGroup: FormGroup;
  estados!: Estado[];
  cidades: Cidade[] = [];

  tiposEnderecos: TipoEndereco[] = [];
  tiposResidencia: TipoResidencia[] = [];
  tiposLogradouro: TipoLogradouro[] = [];
  currentIndex = -1;

  cidadesAdicionadas: Cidade[] = [];

  constructor(
    formBuilder: FormBuilder,
    private enderecoService: EnderecoService) {
    this.enderecoCadastroFormGroup = formBuilder.group({
      identificadorEndereco: ['', [Validators.required]],
      tipoEndereco: ['', [Validators.required]],
      tipoResidencia: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      tipoLogradouro: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    })
    this.enderecoService
      .obterEstados()
      .subscribe(
        estados => this.estados = estados,
        console.log
      );
   }

  ngOnInit(): void {
    this.enderecoService.obterTiposEndereco().subscribe(
      (tiposEndereco) => {
        this.tiposEnderecos = tiposEndereco;
      }
    )
    this.enderecoService.obterTiposResidencia().subscribe(tiposResidencia => this.tiposResidencia = tiposResidencia);
    this.enderecoService.obterTiposLogradouro().subscribe(tiposLogradouro => this.tiposLogradouro = tiposLogradouro);
  }
  
  tipoEnderecoEquals(option, value) {
    return value && option.id == value.id;
  }

  novo() {
    this.editMode = true;
    this.currentIndex = -1;
    this.enderecoCadastroFormGroup.clearValidators();
    this.cidades = [];
    this.enderecoCadastroFormGroup.reset({
      identificadorEndereco: '',
      tipoEndereco: '',
      tipoResidencia: {} as TipoResidencia,
      cep: '',
      tipoLogradouro: {} as TipoLogradouro,
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
  }

  adicionarEndereco() {
    if(this.enderecoCadastroFormGroup.valid) {
      if (this.currentIndex > -1) {
        this.enderecos = [
          ...this.enderecos.filter(enderecoLista => this.enderecos.indexOf(enderecoLista) != this.currentIndex),
          this.enderecoCadastroFormGroup.value
        ];
      } else {
        this.enderecos = [
          ...this.enderecos,
          this.enderecoCadastroFormGroup.value
        ];
      }
      for ( let i=0; i< this.cidades.length; i++) {
        if(this.cidades[i].id == this.enderecoCadastroFormGroup.value.cidade) {
          this.cidadesAdicionadas.push(this.cidades[i]);
          break;
        }  
      }
      this.editMode = false;
      this.currentIndex = -1;
      this.sincronizarEnderecos.emit(this.enderecos);
    }
  }

  obterNomeCidade(idCidade: number) {
    for ( let i=0; i< this.cidades.length; i++) {
      if(this.cidadesAdicionadas[i].id == idCidade) {
        return this.cidadesAdicionadas[i].descricao;
      }  
    }
  }

  obterSiglaEstado(idEstado: number) {
    for ( let i=0; i< this.estados.length; i++) {
      if(this.estados[i].id == idEstado) {
        return this.estados[i].descricao;
      }  
    }
  }

  obterNomeTipoEndereco(idTipoEndereco: number) {
    for ( let i=0; i< this.tiposEnderecos.length; i++) {
      if(this.tiposEnderecos[i].id == idTipoEndereco) {
        return this.tiposEnderecos[i].descricao;
      }  
    }
  }

  removerEndereco(endereco) {
    this.enderecos = this.enderecos.filter(enderecoLista => this.enderecos.indexOf(enderecoLista) != this.enderecos.indexOf(endereco));
    this.sincronizarEnderecos.emit(this.enderecos);
   
  }

  editarEndereco(endereco) { 
    this.enderecoCadastroFormGroup.reset(endereco);
    this.editMode = true;
    this.currentIndex = this.enderecos.indexOf(endereco);
    this.obterCidades();
  }

  cancelar() {
    this.editMode = false;
    this.currentIndex = -1;
  }

  naoExisteCobranca() {
    return !this.enderecos.find(endereco => endereco.tipoEndereco.nome == 'COBRANCA');
  }

  obterCidades() {
    const idEstado = this.enderecoCadastroFormGroup.value.estado;
    for(let i=0; i< this.estados.length; i++) {
      if(this.estados[i].id == idEstado) {
        this.enderecoService.obterCidades(this.estados[i].descricao)
          .subscribe(
            (retornoCidades) => {
              this.cidades = retornoCidades;
            }
          )
      }
    }
  }
  
}
