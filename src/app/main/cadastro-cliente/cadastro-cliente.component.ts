import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  cadastroForm!: FormGroup;
  cadastroCliente: CadastroCliente = {
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
    cpf: '',
    genero: '',
    dataNascimento: new Date(),
    tipoTelefone: '',
    telefone: '',
    enderecos: [],
    cartoes: [],

  };

  constructor(
    formBuilder: FormBuilder,
    private location: Location,
    ) {
    this.cadastroForm = formBuilder.group({
      genero: [null, [Validators.required]],
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      tipoTelefone: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      confirmacaoSenha: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get maxDate(): Date {
    return new Date();
  }

  cancelar(): void {
    this.location.back();
  }

  salvaCliente() {
  }
}
