import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from '../../../../../services/endereco.service';
import {
  TipoResidencia, tiposResidencia,
  TipoLogradouro, tiposLogradouro,
} from '../../../../../types/endereco';

@Component({
  selector: 'app-endereco-old',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  colunasExibidas: string[] = ['logradouro', 'numero', 'tipoEndereco', 'cidade', 'estado', 'acoes'];
  @Input() enderecos: Endereco[] = [];
  @Output() sincronizarEnderecos = new EventEmitter();

  editMode = false;
  enderecoCadastroFormGroup: FormGroup;
  estados!: Estado[];
  cidades: Cidade[] = [];

  tiposEnderecos: TipoEndereco[] = [];
  tiposResidencia: TipoResidencia[] = tiposResidencia;
  tiposLogradouro: TipoLogradouro[] = tiposLogradouro;
  currentIndex = -1;

  cidadesAdicionadas: Cidade[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService) {
    this.enderecoCadastroFormGroup = formBuilder.group({
      tipoEndereco: [null, [Validators.required]],
      // tipoResidencia: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      // tipoLogradouro: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    })
    this.enderecoService.obterEstados().subscribe(
      (estadosResponse) => {
        this.estados = estadosResponse;
      },
      (error) => {
        console.log(error);
      }
    );
   }

  ngOnInit(): void {
    this.enderecoService.obterTiposEndereco().subscribe(
      (tiposEndereco) => {
        this.tiposEnderecos = tiposEndereco;
        this.preencherDadosEndereco();
      }
    )
  }
  
  tipoEnderecoEquals(option, value) {
    return value && option.id == value.id;
  }

  estadoEquals(option, value) {
    console.log('estadoEquals', option, value)
    return value && option.id == value.id;
    
  }

  cidadeEquals(option, value) {
    console.log('cidadeEquals', option, value)
    return value && option.id == value.id;
    
  }

  private preencherDadosEndereco() {
    this.enderecos = this.enderecos.map(endereco => {
      this.cidadesAdicionadas.push({...endereco.cidade});
      console.log(endereco);
      return {
        ...endereco,
        estado: endereco.cidade.estado,
      }
    });
  }

  novo() {
    this.editMode = true;
    this.currentIndex = -1;
    this.enderecoCadastroFormGroup.clearValidators();
    this.cidades = [];
    this.enderecoCadastroFormGroup.reset({
      tipoEndereco: '',
      // tipoResidencia: '',
      cep: '',
      // tipoLogradouro: '',
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
          {
            id: this.enderecos.find(enderecoLista => this.enderecos.indexOf(enderecoLista) == this.currentIndex).id,
            ...this.enderecoCadastroFormGroup.value
          }
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
      console.log('adicionarEndereco', this.enderecos)
      this.editMode = false;
      this.currentIndex = -1;
      this.sincronizarEnderecos.emit(this.enderecos);
    } else {
      this.validarCamposFormulario(this.enderecoCadastroFormGroup);
    }
  }

  validarCamposFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validarCamposFormulario(control);
      }
    });
  }

  obterNomeCidade(idCidade: number) {
    for ( let i=0; i< this.cidadesAdicionadas.length; i++) {
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
    const estado = this.enderecoCadastroFormGroup.value.estado;
    this.enderecoService.obterCidades(estado.descricao)
          .subscribe(
            (retornoCidades) => {
              this.cidades = retornoCidades;
            }
          )

  }
}
