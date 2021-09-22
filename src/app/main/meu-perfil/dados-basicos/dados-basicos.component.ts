import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-dados-basicos',
  templateUrl: './dados-basicos.component.html',
  styleUrls: ['./dados-basicos.component.css']
})
export class DadosBasicosComponent implements OnInit {
  cadastroForm!: FormGroup;
  generos: Genero[] = [];
  tiposTelefone: TipoTelefone[] = [];
  
  cadastroCliente: Cliente = {
    nome: null,
    email: null,
    dataNascimento: null,
    telefone: null,
    tipoTelefone: null,
    enderecos: [],
    documentos: [],
    cartoes: []
  };

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
  ) {

    this.cadastroForm = formBuilder.group({
      genero: [this.cadastroCliente.genero, [Validators.required]],
      email: [this.cadastroCliente.email, [Validators.required]],
      nome: [this.cadastroCliente.nome, [Validators.required]],
      dataNascimento: [this.cadastroCliente.dataNascimento, [Validators.required]],
      cpf: [this.cadastroCliente.cpf, [Validators.required]],
      tipoTelefone: [this.cadastroCliente.tipoTelefone, [Validators.required]],
      telefone: [this.cadastroCliente.telefone, [Validators.required]],
    });
    this.clienteService
      .obterGeneros()
      .subscribe(generos => this.generos = generos);
      
    this.clienteService
      .obterTiposTelefone()
      .subscribe(tiposTelefone => this.tiposTelefone = tiposTelefone);

    this.clienteService.obterCadastroClienteLogado()
      .subscribe(clientes => {
        this.cadastroCliente = clientes[0];
        this.cadastroForm = formBuilder.group({
          email: [this.cadastroCliente.email, [Validators.required]],
          genero: [this.cadastroCliente.genero, [Validators.required]],
          nome: [this.cadastroCliente.nome, [Validators.required]],
          dataNascimento: [this.cadastroCliente.dataNascimento, [Validators.required]],
          tipoTelefone: [this.cadastroCliente.telefones[0].tipoTelefone, [Validators.required]],
          telefone: [this.cadastroCliente.telefones[0].numero, [Validators.required]],
        });
      });
      
  }

  ngOnInit(): void {
  }

  get maxDate(): Date {
    return new Date();
  }

  equalsObj(option1: any, option2: any) {
    return option1.id == option2?.id;
  }

  sincronizarDocumentos(documentos: Documento[]) {
    this.cadastroCliente.documentos = [...documentos];
  }

  cancelar() {
    
  }

  salvaCliente() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
      this.clienteService.alterarDadosBasicosCliente({
        ...this.cadastroForm.value,
        id: this.cadastroCliente.id,
        documentos: this.cadastroCliente.documentos
      })
      .subscribe(retorno => {
        alert(retorno)
      });
    }
    // this.clienteService.alterarDadosBasicosCliente(this.cadastroForm.value)
  }

}
