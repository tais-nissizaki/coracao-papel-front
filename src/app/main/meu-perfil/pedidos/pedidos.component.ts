import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasService } from '../../../services/datas.service';

import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: SolicitacaoPedido[] = [];
  dataInicialPesquisa = '';
  dataFinalPesquisa = '';
  colunasExibidas: string[] = ['numeroPedido', 'dataPedido', 'endereco', 'valorPedido', 'status', 'detalhes'];
  pedido?: SolicitacaoPedido;
  solicatacaoTroca = false;
  todosSelecionados = false;

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private datasService: DatasService
  ) { }

  ngOnInit(): void {
    this.dataFinalPesquisa = this.datasService.formatarData(new Date());
    this.dataInicialPesquisa = this.datasService.formatarData(new Date(new Date().getTime() - (30*24*60*60*1000)))
    this.pesquisar();
  }

  pesquisar() {
    this.pedido = undefined;
    const dataInicialArray = this.dataInicialPesquisa.split("/");
    const dataFinalArray = this.dataFinalPesquisa.split("/");
    const dataInicialFiltro = new Date(parseInt(dataInicialArray[2]), parseInt(dataInicialArray[1]) -1, parseInt(dataInicialArray[0]));
    const dataFinalFiltro = new Date(parseInt(dataFinalArray[2]), parseInt(dataFinalArray[1]) -1, parseInt(dataFinalArray[0]), 23, 59, 59);
    this.pedidoService.consultarPedidos(dataInicialFiltro, dataFinalFiltro)
      .subscribe(pedidos => this.pedidos = pedidos)
  }

  detalhes(pedido: SolicitacaoPedido) {
    this.pedido = pedido;
    this.solicatacaoTroca = false;
  }

  solicitarTroca(pedido: SolicitacaoPedido) {
    this.pedido = pedido;
    this.solicatacaoTroca = true;
  }
  
  atualizarTodosSelecionados() {
    this.todosSelecionados = this.pedido.itensPedido != null && this.pedido.itensPedido.every(t => t.selecionado);
  }

  algunsItensSelecionados(): boolean {
    if (this.pedido.itensPedido == null) {
      return false;
    }
    return this.pedido.itensPedido.filter(t => t.selecionado).length > 0 && !this.todosSelecionados;
  }

  selecionarTodos(completed: boolean) {
    if (this.pedido.itensPedido == null) {
      return;
    }
    this.pedido.itensPedido.forEach(t => t.selecionado = completed);
  }

  get colunasDetalhePedido() {
    const colunasPadrao = ['produto', 'quantidade', 'valor'];
    if (this.solicatacaoTroca) {
      return [
        'checkTroca',
        ...colunasPadrao
      ]
    } else {
      return colunasPadrao;
    }
  }

  
  solicitarTrocaPedidoSelecionado() {
    this.router.navigateByUrl('/meu-perfil/pedidos/confirmacao-troca', {state: {data: this.pedido}})
  }

}
