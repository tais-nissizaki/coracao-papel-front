import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  filtroNome = '';
  clientes: CadastroCliente[] = [];

  constructor(
    private clienteSevice: ClienteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  pesquisar() {
    console.log(this.filtroNome)
    this.clienteSevice.pesquisarCliente({nome: this.filtroNome, enderecos: [], documentos: []}).subscribe(
      (retorno) => {
        console.log(retorno);
        this.clientes = retorno;
      }
    );
  }

  editar(cliente: CadastroCliente) {
    this.router.navigateByUrl(`/administrador/clientes/cadastro/${cliente.id}`)
  }

  ativarInativar(cliente: CadastroCliente) {
    console.log(cliente);
    if(cliente.ativo) {
      this.clienteSevice.inativarCliente(cliente).subscribe(
        (retorno) => {
          alert(retorno);
          this.pesquisar();
        }
      );
    } else {
      this.clienteSevice.ativarCliente(cliente).subscribe(
        (retorno) => {
          alert(retorno);
          this.pesquisar();
        }
      );
    }

    
  }

}
