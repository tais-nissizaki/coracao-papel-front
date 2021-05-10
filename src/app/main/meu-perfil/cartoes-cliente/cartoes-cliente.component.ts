import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cartoes-cliente',
  templateUrl: './cartoes-cliente.component.html',
  styleUrls: ['./cartoes-cliente.component.css']
})
export class CartoesClienteComponent implements OnInit {

  cartoes: Cartao[] = [];

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.clienteService.obterCadastroClienteLogado()
      .subscribe(clientes => {
        this.cartoes = clientes[0].cartoes;
      });
  }

  sincronizarCartoes(cartoes: Cartao[]) {
    this.cartoes = [...cartoes];
  }
}
