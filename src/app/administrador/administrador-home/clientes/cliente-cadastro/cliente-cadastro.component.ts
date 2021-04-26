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
      // genero: [null, [Validators.required]],
      // email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      tipoCliente: [null, [Validators.required]],
      // dataNascimento: [null, [Validators.required]],
      // cpf: [null, [Validators.required]],
      // tipoTelefone: [null, [Validators.required]],
      // telefone: [null, [Validators.required]],
      // senha: [null, [Validators.required]],
      // confirmacaoSenha: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.clienteSevice
      .obterTiposCliente()
      .subscribe((tiposCliente) => {
        this.tiposCliente = tiposCliente;
      });
    this.route.paramMap.subscribe(params => {
      this.clienteSevice.pesquisarCliente({id: +params.get('id')} as Cliente)
      .subscribe(clientes => {
        this.id = params.get('id'); 
        this.cadastroCliente = clientes[0];
        this.cadastroForm = this.formBuilder.group({
          nome: [this.cadastroCliente.nome, [Validators.required]],
          tipoCliente: [this.cadastroCliente.tipoCliente, [Validators.required]],
        })
      });
    });
  }

  tipoClienteEquals(option, value): boolean {
    return option.id == value.id;
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
      console.log(resultado);
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

}
