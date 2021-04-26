import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  generos: Genero[] = [];
  tiposTelefone: TipoTelefone[] = [];
  cadastroForm!: FormGroup;
  cadastroCliente: Cliente = {
    nome: '',
    email: '',
    dataNascimento: new Date(),
    telefone: '',
    tipoTelefone: {} as TipoTelefone,
    enderecos: [],
    documentos: [],
    cartoes: [],
    usuario: {
      senha: '',
      confirmacaoSenha: '',
      nomeUsuario: ''
    }
  };

  constructor(
    formBuilder: FormBuilder,
    private location: Location,
    private clienteService: ClienteService,
    private router: Router,
    ) {
    this.cadastroForm = formBuilder.group({
      genero: [null, [Validators.required]],
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      tipoTelefone: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      usuario: formBuilder.group({
        senha: [null, [Validators.required]],
        confirmacaoSenha: [null, [Validators.required]]
      }),
    });

    this.clienteService
      .obterGeneros()
      .subscribe(generos => this.generos = generos);
      
    this.clienteService
      .obterTiposTelefone()
      .subscribe(tiposTelefone => this.tiposTelefone = tiposTelefone)
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
    this.cadastroCliente = {
      ...this.cadastroCliente,
      ...this.cadastroForm.value
    }
    this.clienteService
      .salvarCliente(this.cadastroCliente)
      .subscribe((resultado) => {
        if(!`${resultado}`.startsWith('Erro: ')) {
          this.router.navigateByUrl('/login').then(console.log).catch(console.error);
        }
      });
  }

  sincronizarDocumentos(documentos: Documento[]) {
    this.cadastroCliente.documentos = [...documentos];
  }

  sincronizarEnderecos(enderecos: Endereco[]) {
    this.cadastroCliente.enderecos = [...enderecos];
  }
  sincronizarCartoes(cartoes: Cartao[]) {
    this.cadastroCliente.cartoes = [...cartoes];
  }
}
