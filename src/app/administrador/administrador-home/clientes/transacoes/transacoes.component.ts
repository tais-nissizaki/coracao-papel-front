import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { DetalheTransacaoComponent } from './detalhe-transacao/detalhe-transacao.component';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit {

  colunas = ['numeroPedido', 'data', 'valorPedido', 'valorFrete', 'status', 'ações'];
  pedidos: SolicitacaoPedido[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pedidoService.consultarPedidos(undefined, undefined, undefined, Number(params.get('id')))
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });
    });
  }

  abrirDetalhes(pedido: Pedido) {

    const dialogRef = this.dialog.open(DetalheTransacaoComponent, {
      width: '100%',
      data: pedido,
      disableClose: true
    });
  }
}
