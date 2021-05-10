import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from 'src/app/services/pedido.service';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExecutarAcaoComponent } from './executar-acao/executar-acao.component';
import { GerenciarTrocaModalComponent } from './gerenciar-troca-modal/gerenciar-troca-modal.component';

@Component({
  selector: 'app-gerenciar-vendas',
  templateUrl: './gerenciar-vendas.component.html',
  styleUrls: ['./gerenciar-vendas.component.css']
})
export class GerenciarVendasComponent implements OnInit {

  colunas = ['numeroPedido', 'valorTotal', 'endereco', 'status', 'acoes']

  pedidos: SolicitacaoPedido[] = [];

  pesquisado = false;

  statusPedidoFiltro: StatusPedido|null = null;
  statusPedido: StatusPedido[] = [];
  dataInicialFiltro: Date|null = null;
  dataFinalFiltro: Date|null = null;

  constructor(
    public dialog: MatDialog,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.pedidoService.obterStatusPedido()
      .subscribe(statusPedido => this.statusPedido = statusPedido);
  }

  pesquisar() {
    this.pesquisado = true;
    this.pedidoService.consultarPedidos(this.dataInicialFiltro, this.dataFinalFiltro, this.statusPedidoFiltro?.id)
      .subscribe(pedidos => this.pedidos = pedidos);
    
  }

  detalhesPedido(pedido: SolicitacaoPedido) {
    this.dialog.open(DetalhesComponent, {
      width: '100%',
      data: pedido,
      disableClose: true
    });
  }

  aprovarPagamento(pedido: SolicitacaoPedido) {
    const dialogRef = this.dialog.open(ExecutarAcaoComponent, {
      width: '450px',
      data: {
        title: 'Aprovar pagemento',
        content: 'Confirma a aprovação do pagamento do pedido?'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.pedidoService.aprovarPagamentoPedido(pedido)
          .subscribe(retorno => {
            if(retorno && retorno.includes('Erro')) {
              alert(retorno);
            } else {
              alert('Pagamento aprovado com sucesso.');
              this.pesquisado = false;
              this.statusPedidoFiltro = null;
              this.pedidos = [];
            }
          })
      }
    });
  }

  enviarPedido(pedido: SolicitacaoPedido) {
    const dialogRef = this.dialog.open(ExecutarAcaoComponent, {
      width: '450px',
      data: {
        title: 'Despachar pedido',
        content: 'Confirma o envio do pedido à transportadora?'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.pedidoService.enviarPedido(pedido)
          .subscribe(retorno => {
            if(retorno && retorno.includes('Erro')) {
              alert(retorno);
            } else {
              alert('Pedido enviado com sucesso.');
              this.pesquisado = false;
              this.statusPedidoFiltro = null;
              this.pedidos = [];
            }
          })
      }
    });
  }

  efetivarEntrega(pedido: SolicitacaoPedido) {
    const dialogRef = this.dialog.open(ExecutarAcaoComponent, {
      width: '450px',
      data: {
        title: 'Efetivar entrega',
        content: 'Confirma a entrega do pedido ao cliente?'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.pedidoService.entregarPedido(pedido)
          .subscribe(retorno => {
            if(retorno && retorno.includes('Erro')) {
              alert(retorno);
            } else {
              alert('Pedido entregue com sucesso.');
              this.pesquisado = false;
              this.statusPedidoFiltro = null;
              this.pedidos = [];
            }
          })
      }
    });
  }

  aprovarSolicitacaoTroca(pedido: SolicitacaoPedido) {
    const dialogRef = this.dialog.open(ExecutarAcaoComponent, {
      width: '450px',
      data: {
        title: 'Aprovar solicitação de troca',
        content: 'Confirma a aprovação da solicitação de troca?'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.pedidoService.aprovarTrocaDoPedido(pedido)
          .subscribe(retorno => {
            if(retorno && retorno.includes('Erro')) {
              alert(retorno);
            } else {
              alert('Solicitação de troca aprovada.');
              this.pesquisado = false;
              this.statusPedidoFiltro = null;
              this.pedidos = [];
            }
          });
      }
    });
  }

  efetivarDevolucaoTroca(pedido: SolicitacaoPedido) {
    const dialogRef = this.dialog.open(GerenciarTrocaModalComponent, {
      width: '700px',
      data: {
        title: 'Confirmar devolução da troca',
        pedido: pedido,
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if(value) {
        this.pedidoService.finalizarTrocaDoPedido(pedido, value == 'retornar')
          .subscribe(retorno => {
            if(retorno && retorno.includes('Erro')) {
              alert(retorno);
            } else {
              alert('Troca efetuada com sucesso.');
              this.pesquisado = false;
              this.statusPedidoFiltro = null;
              this.pedidos = [];
            }
          });
          this.pesquisado = false;
          this.statusPedidoFiltro = {} as StatusPedido;
      }
    });
  }

  obterDataStatus(transacoes: Transacao[]) {
    return [...transacoes].pop().dtCadastro;
  }
}
