import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-troca',
  templateUrl: './confirmacao-troca.component.html',
  styleUrls: ['./confirmacao-troca.component.css']
})
export class ConfirmacaoTrocaComponent implements OnInit {

  solicitacaoTroca?: Pedido = {
    produtos: []
  } as Pedido;
  colunasDetalhePedido = ['produto', 'quantidade', 'valor']

  constructor(
    private location: Location,
    private router: Router
  ) { }


  ngOnInit(): void {
    console.log(this.location.getState());
    const pedido = window.history.state?.data;
    if(pedido) {
      this.solicitacaoTroca = pedido;
    } else {
      this.router.navigateByUrl('/meu-perfil/pedidos');
    }
  }

}
