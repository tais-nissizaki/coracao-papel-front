import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RelatorioClientesComponent implements OnInit {

  formFiltro: FormGroup;
  estados!: Estado[];
  cidades: Cidade[] = [];
  tiposCliente: TipoCliente[] = [];
  clientes: Cliente[] = [];
  clienteExpandido?: Cliente;
  colunas = ['expand', 'nome', 'dataNascimento', 'genero', 'tipoCliente']

  constructor(
    formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private clienteSevice: ClienteService,
  ) {
    this.formFiltro = formBuilder.group({
      faixaEtaria: [null],
      estado: [null],
      cidade: [null],
      nomeParcial: [null],
      genero: [null],
      tipoCliente: [null]
    })

    enderecoService.obterEstados().subscribe(
      (estadosResponse) => {
        this.estados = estadosResponse;
      }
    );
    
    clienteSevice.obterTiposCliente().subscribe((tiposCliente) => {
      this.tiposCliente = tiposCliente;
    });
  }

  ngOnInit(): void {
    this.clientes = [
      {
        id: 1,
        nome: 'João',
        dataNascimento: new Date(1975, 3, 17),
        genero: {
          id: 1,
          nome: 'MASCULINO',
          descricao: 'Masculino'
        },
        tipoCliente: {
          id: 2,
          nome: 'PRATA',
          descricao: 'Prata',
        },
        email: '',
        documentos: [],
        enderecos: [],
        senha: '', 
        cpf: '', 
        tipoTelefone: {} as TipoTelefone, 
        telefone: '', 
        cartoes: [],
      }
    ]
  }

  estadoEquals(option, value) {
    return value && option.id == value.id;
  }

  obterCidades() {
    const estado = this.formFiltro.value.estado;
    this.enderecoService.obterCidades(estado.descricao)
          .subscribe(
            (retornoCidades) => {
              this.cidades = retornoCidades;
            }
          )

  }
}
