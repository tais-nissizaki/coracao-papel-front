import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {

  @Input() enderecosEntrega!: Endereco[];
  @Output("selecionarEndereco") selecionarEnderecoEmitter = new EventEmitter();
  @Output("adicionarEndereco") adicionarEnderecoEmitter = new EventEmitter();
  
  colunasExibidas = ['selecionar', 'identificadorEndereco', 'logradouro']
  enderecoEntregaFormGroup: FormGroup;
  novoEnderecoEntregaFormGroup: FormGroup;
  desejaCadastrarEnderecoControl = new FormControl(false);
  exibirFormularioNovoEndereco = false;
  paises!: Pais[];
  estados: Estado[] = [];
  cidades: Cidade[] = [];

  tiposEnderecos: TipoEndereco[] = [];
  tiposResidencia: TipoResidencia[] = [];
  tiposLogradouro: TipoLogradouro[] = [];
  
  estado: Estado ={
    id: -1,
    descricao: ''
  }

  constructor(
    formBuilder: FormBuilder,
    private enderecoService: EnderecoService
  ) {
    this.enderecoEntregaFormGroup = formBuilder.group({
      enderecoEntrega: [null, [Validators.required]],
    });
    this.novoEnderecoEntregaFormGroup = formBuilder.group({
      identificadorEndereco: ['', [Validators.required]],
      tipoEndereco: [null, [Validators.required]],
      tipoResidencia: [null, [Validators.required]],
      cep: ['', [Validators.required]],
      tipoLogradouro: [null, [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      pais: [null, [Validators.required]],
      desejaCadastrarEndereco: [false],
    });
  }

  ngOnInit(): void {
    this.enderecoService.obterPaises().subscribe(paises => this.paises = paises);
    // this.enderecoService.obterEstados().subscribe(estados => this.estados = estados);
    this.enderecoService.obterTiposEndereco().subscribe(tiposEndereco => this.tiposEnderecos = tiposEndereco);
    this.enderecoService.obterTiposResidencia().subscribe(tiposResidencia => this.tiposResidencia = tiposResidencia);
    this.enderecoService.obterTiposLogradouro().subscribe(tiposLogradouro => this.tiposLogradouro = tiposLogradouro);
  }
  
  tipoEnderecoEquals(option, value) {
    return value && option.id == value.id;
  }

  obterEstados() {
    this.enderecoService
      .obterEstados(this.novoEnderecoEntregaFormGroup.value.pais)
      .subscribe(estados => this.estados = estados);
  }

  obterCidades() {
    for(let i=0; i< this.estados.length; i++) {
      if (this.novoEnderecoEntregaFormGroup.value.estado) {
        this.enderecoService.obterCidades(this.novoEnderecoEntregaFormGroup.value.estado.descricao)
          .subscribe(
            (retornoCidades) => {
              this.cidades = retornoCidades;
            }
          )
      }
    }
  }

  salvarNovoEndereco() {
    if (this.novoEnderecoEntregaFormGroup.valid) {
      this.adicionarEnderecoEmitter.emit(this.novoEnderecoEntregaFormGroup.value);
      this.enderecoEntregaFormGroup.controls.enderecoEntrega.setValue(-0);
    }
  }

  selecionarEndereco(endereco: Endereco) {
    this.enderecoEntregaFormGroup.get('enderecoEntrega').setValue(endereco.id);
    this.selecionarEnderecoEmitter.emit(endereco);
  }
  
  enderecoEstaSelecionado(endereco: Endereco): boolean {
    if(this.enderecoEntregaFormGroup.value.enderecoEntrega == null) {
      return false;
    }
    if(this.enderecoEntregaFormGroup.value.enderecoEntrega.id != null) {
      return this.enderecoEntregaFormGroup.value.enderecoEntrega.id === endereco.id;
    }
    return this.enderecoEntregaFormGroup.value.enderecoEntrega.identificadorEndereco === endereco.identificadorEndereco;
  }

}
