import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
  generos: Genero[] = [];
  tiposTelefone: TipoTelefone[] = [];
  cadastroForm!: FormGroup;
  tiposCliente: TipoCliente[] = [];

  cadastroCliente: Cliente = {
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
    cpf: '',
    dataNascimento: new Date(),
    tipoTelefone: {} as TipoTelefone,
    telefone: '',
    enderecos: [],
    documentos: [],
    cartoes: [],

  };

  id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private clienteSevice: ClienteService,
  ) {
    
    this.cadastroForm = formBuilder.group({
      email: [null, [Validators.required]],
      // usuario: formBuilder.group({
      //   senha: [null, [Validators.required]],
      //   confirmacaoSenha: [null, [Validators.required]]
      // }),
      genero: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      tipoCliente: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      tipoTelefone: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.clienteSevice
      .obterTiposCliente()
      .subscribe((tiposCliente) => {
        this.tiposCliente = tiposCliente;
      });

      this.clienteSevice
        .obterGeneros()
        .subscribe(generos => this.generos = generos);
        
      this.clienteSevice
        .obterTiposTelefone()
        .subscribe(tiposTelefone => this.tiposTelefone = tiposTelefone)
    this.route.paramMap.subscribe(params => {
      this.clienteSevice.pesquisarCliente({id: +params.get('id')} as Cliente)
      .subscribe(clientes => {
        this.id = params.get('id'); 
        this.cadastroCliente = clientes[0];
        this.cadastroForm = this.formBuilder.group({
          
          email: [this.cadastroCliente.email, [Validators.required]],
          // usuario: this.formBuilder.group({
          //   senha: [this.cadastroCliente.usuario.senha, [Validators.required]],
          //   confirmacaoSenha: [this.cadastroCliente.usuario.confirmacaoSenha, [Validators.required]]
          // }),
          genero: [this.cadastroCliente.genero, [Validators.required]],
          nome: [this.cadastroCliente.nome, [Validators.required]],
          tipoCliente: [this.cadastroCliente.tipoCliente, [Validators.required]],
          dataNascimento: [this.cadastroCliente.dataNascimento + 'T00:00:00', [Validators.required]],
          tipoTelefone: [this.cadastroCliente.telefones[0].tipoTelefone, [Validators.required]],
          telefone: [this.cadastroCliente.telefones[0].numero, [Validators.required]],
        })
      });
    });
  }

  get maxDate(): Date {
    return new Date();
  }

  tipoClienteEquals(option, value): boolean {
    return value && option.id == value.id;
  }

  cancelar() {
    this.location.back();
  }

  salvarCliente() {
    this.cadastroCliente = {
      ...this.cadastroCliente,
      ...this.cadastroForm.value
    }
    console.log(this.cadastroCliente);
    this.clienteSevice.alterarCliente(this.cadastroCliente).subscribe((resultado) => {
      alert(resultado);
      if(!`${resultado}`.startsWith('Erro: ')) {
        this.router.navigateByUrl('/administrador/clientes').then(value => console.log).catch(err => console.error);
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
