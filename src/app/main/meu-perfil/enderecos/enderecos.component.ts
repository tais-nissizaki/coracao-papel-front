import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {

  enderecos: Endereco[] = [];

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {

    this.clienteService.obterCadastroClienteLogado()
      .subscribe(clientes => {
        this.enderecos = clientes[0].enderecos;
      });
  }

  sincronizarEnderecos(endereco: Endereco) {
    
  }

}
