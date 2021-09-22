import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { EnderecoService } from '../../services/endereco.service';
import { VerificaEnderecoCobrancaValidation } from '../../validations/existe-endereco-cobranca.validation';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  colunasExibidas: string[] = ['logradouro', 'numero', 'tipoEndereco', 'cidade', 'estado', 'acoes'];
  @Input() alteracaoCadastro?: boolean;
  @Input() enderecos?: Endereco[] = [];
  @Output() sincronizarEnderecos = new EventEmitter();

  editMode = false;
  enderecoCadastroFormGroup: FormGroup;
  paises!: Pais[];
  estados: Estado[] = [];
  cidades: Cidade[] = [];

  tiposEnderecos: TipoEndereco[] = [];
  tiposResidencia: TipoResidencia[] = [];
  tiposLogradouro: TipoLogradouro[] = [];
  currentIndex = -1;

  constructor(
    formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private authStorageService: AuthStorageService
  ) {
    this.enderecoCadastroFormGroup = formBuilder.group({
      id: [null],
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
    })
   }

  ngOnInit(): void {
    this.enderecoService.obterTiposEndereco().subscribe(
      (tiposEndereco) => {
        this.tiposEnderecos = tiposEndereco;
      }
    )
    this.enderecoService.obterTiposResidencia().subscribe(tiposResidencia => this.tiposResidencia = tiposResidencia);
    this.enderecoService.obterTiposLogradouro().subscribe(tiposLogradouro => this.tiposLogradouro = tiposLogradouro);
    this.enderecoService.obterPaises().subscribe(paises => this.paises = paises);
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
      tipoEndereco: null,
      tipoResidencia: null,
      cep: '',
      tipoLogradouro: null,
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: null,
    });
  }

  adicionarEndereco() {
    this.enderecoCadastroFormGroup.markAllAsTouched();
    if(this.enderecoCadastroFormGroup.valid) {
      
      if(this.alteracaoCadastro) {
        this.adicionarEnderecoAlteracaoCadastro();
      } else {
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
        this.editMode = false;
        this.currentIndex = -1;
        this.sincronizarEnderecos.emit(this.enderecos);
      }
    }
  }

  
  adicionarEnderecoAlteracaoCadastro() {
    if (this.currentIndex > -1) {
      this.enderecoService
        .alterarEndereco(this.authStorageService.obterDadosAutenticacao().idCliente, this.enderecoCadastroFormGroup.value)
        .subscribe(retorno => {
          if (retorno && retorno.includes('Erro')) {
            alert(retorno);
          } else {
            alert(retorno);
            this.enderecos = [
              ...this.enderecos.filter(enderecoLista => this.enderecos.indexOf(enderecoLista) != this.currentIndex),
              this.enderecoCadastroFormGroup.value
            ];
          }
          this.editMode = false;
          this.currentIndex = -1;
          this.sincronizarEnderecos.emit(this.enderecos);
        });
    } else {
      this.enderecoService
        .salvarEndereco(this.authStorageService.obterDadosAutenticacao().idCliente, this.enderecoCadastroFormGroup.value)
        .subscribe(retorno => {
          if (retorno && retorno.includes('Erro')) {
            alert(retorno);
          } else {
            alert(retorno);
            this.enderecos = [
              ...this.enderecos,
              this.enderecoCadastroFormGroup.value
            ];
          }
          this.editMode = false;
          this.currentIndex = -1;
          this.sincronizarEnderecos.emit(this.enderecos);
        });
    }
  }

  removerEndereco(endereco) {
    if(this.alteracaoCadastro) {
      this.enderecoService
        .inativarEndereco(this.authStorageService.obterDadosAutenticacao().idCliente, endereco)
        .subscribe(retorno => {
          if (retorno && retorno.includes('Erro')) {
            alert(retorno);
          } else {
            alert(retorno);
            this.enderecos = this.enderecos.filter(enderecoLista => this.enderecos.indexOf(enderecoLista) != this.enderecos.indexOf(endereco));
          }
          this.sincronizarEnderecos.emit(this.enderecos);
        });
    } else {
      this.enderecos = this.enderecos.filter(enderecoLista => this.enderecos.indexOf(enderecoLista) != this.enderecos.indexOf(endereco));
      this.sincronizarEnderecos.emit(this.enderecos);
    }
   
  }

  equalsObject(opcao1: any, opcao2: any) {
    return opcao2 && opcao1 && opcao1.id == opcao2.id;
  }

  editarEndereco(endereco: Endereco) { 
    this.enderecoCadastroFormGroup.reset({
      ...endereco,
      estado: endereco.cidade.estado,
      pais: endereco.cidade.estado.pais,
    });

    
    this.editMode = true;
    this.currentIndex = this.enderecos.indexOf(endereco);
    this.obterEstados();
    this.obterCidades();
  }

  cancelar() {
    this.editMode = false;
    this.currentIndex = -1;
  }

  naoExisteCobranca() {
    return !this.enderecos.find(endereco => endereco.tipoEndereco.nome == 'COBRANCA');
  }

  obterEstados() {
    this.enderecoService
      .obterEstados(this.enderecoCadastroFormGroup.value.pais)
      .subscribe(estados => {
        this.estados = estados
      });
  }

  obterCidades() {
    this.enderecoService.obterCidades(this.enderecoCadastroFormGroup.value.estado.descricao)
      .subscribe(
        (retornoCidades) => {
          this.cidades = retornoCidades;
        }
      )
  }
  
}
