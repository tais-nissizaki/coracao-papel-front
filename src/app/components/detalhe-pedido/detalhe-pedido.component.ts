import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.css']
})
export class DetalhePedidoComponent implements OnInit {

  @Input() pedido!: SolicitacaoPedido;
  @Input() exibirNumeroPedido: boolean;

  colunasProdutos = ['titulo', 'quantidade', 'valor'];

  colunasTrasacoes = ['data', 'transacao'];

  constructor() { }

  ngOnInit(): void {
  }

}
