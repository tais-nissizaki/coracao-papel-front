import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from '../../../services/endereco.service';
import { 
  TipoEndereco, tiposEnderecos,
  TipoResidencia, tiposResidencia,
  TipoLogradouro, tiposLogradouro,
} from '../../../types/endereco';
import { VerificaEnderecoCobrancaValidation } from '../../../validations/existe-endereco-cobranca.validation';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  colunasExibidas: string[] = ['tipoLogradouro', 'logradouro', 'cidade', 'estado', 'acoes'];
  enderecos: Endereco[] = [];

  editMode = false;
  enderecoCadastroFormGroup: FormGroup;
  estados!: Estado[];

  tiposEnderecos: TipoEndereco[] = tiposEnderecos;
  tiposResidencia: TipoResidencia[] = tiposResidencia;
  tiposLogradouro: TipoLogradouro[] = tiposLogradouro;
  currentIndex = -1;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService) {
    this.enderecoCadastroFormGroup = formBuilder.group({
      tipoEndereco: ['', [Validators.required]],
      tipoResidencia: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      tipoLogradouro: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    })
    this.estados = this.enderecoService.estados;
   }

  ngOnInit(): void {
  }

  novo($event) {
    $event.preventDefault();
    this.editMode = true;
    this.currentIndex = -1;
    this.enderecoCadastroFormGroup.clearValidators();
    this.enderecoCadastroFormGroup.reset({
      tipoEndereco: '',
      tipoResidencia: '',
      cep: '',
      tipoLogradouro: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
  }

  adicionarEndereco($event) {
    console.log(this.enderecoCadastroFormGroup.value);
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
      this.editMode = false;
      this.currentIndex = -1;
    }
  }

  removerEndereco(endereco, $event) {
    $event.preventDefault();    
    this.enderecos = this.enderecos.filter(enderecoLista => this.enderecos.indexOf(enderecoLista) != this.enderecos.indexOf(endereco));
   
  }

  editarEndereco(endereco, $event) {
    $event.preventDefault();    
    this.enderecoCadastroFormGroup.reset(endereco);
    this.editMode = true;
    this.currentIndex = this.enderecos.indexOf(endereco);
  }

  cancelar() {
    this.editMode = false;
    this.currentIndex = -1;
  }

  naoExisteCobranca() {
    return !this.enderecos.find(endereco => endereco.tipoEndereco == 'COBRANCA');
  }
}
