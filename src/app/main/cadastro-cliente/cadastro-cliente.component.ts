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
  cadastroForm!: FormGroup;
  cadastroCliente: CadastroCliente = {
    nome: '',
    // email: '',
    // senha: '',
    // confirmacaoSenha: '',
    // cpf: '',
    // genero: '',
    // dataNascimento: new Date(),
    // tipoTelefone: '',
    // telefone: '',
    enderecos: [],
    documentos: []
    // cartoes: [],

  };

  constructor(
    formBuilder: FormBuilder,
    private location: Location,
    private clienteService: ClienteService,
    private router: Router,
    ) {
    this.cadastroForm = formBuilder.group({
      // genero: [null, [Validators.required]],
      // email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      // dataNascimento: [null, [Validators.required]],
      // cpf: [null, [Validators.required]],
      // tipoTelefone: [null, [Validators.required]],
      // telefone: [null, [Validators.required]],
      // senha: [null, [Validators.required]],
      // confirmacaoSenha: [null, [Validators.required]],
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
    this.cadastroCliente = {
      ...this.cadastroCliente,
      ...this.cadastroForm.value
    }
    console.log(this.cadastroCliente);
    this.clienteService.salvarCliente(this.cadastroCliente).subscribe((resultado) => {
      console.log(resultado);
      alert(resultado);
      if(!`${resultado}`.startsWith('Erro: ')) {
        this.router.navigateByUrl('/login').then(value => console.log).catch(err => console.error);
      }
    });
  }

  sincronizarDocumentos(documentos: Documento[]) {
    this.cadastroCliente.documentos = [...documentos];
    console.log(this.cadastroCliente.documentos);
  }

  sincronizarEnderecos(enderecos: Endereco[]) {
    this.cadastroCliente.enderecos = [...enderecos];
  }
}
