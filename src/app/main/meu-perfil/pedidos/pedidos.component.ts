import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, Validators } from '@angular/forms';
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
  quantidadesMaximas: number[] = [];

  formTroca = new FormArray([]);

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
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      })
  }

  detalhes(pedido: SolicitacaoPedido) {
    this.pedido = pedido;
    this.pedido.itensPedido.forEach(itemPedido => itemPedido.selecionado = false);
    this.solicatacaoTroca = false;
    this.quantidadesMaximas = [];
  }

  solicitarTroca(pedido: SolicitacaoPedido) {
    this.pedido = pedido;
    this.solicatacaoTroca = true;
    this.quantidadesMaximas = this.pedido.itensPedido.map(itemPedido => itemPedido.quantidade);
    this.pedido.itensPedido.forEach(itemPedido => {
      this.formTroca.push(new FormControl(itemPedido.quantidade, [Validators.required, Validators.min(1), Validators.max(itemPedido.quantidade)]));
    })
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

  calcularValorItem(itemPedido: ItemPedido) {
    let valorItem = itemPedido.produto.valor * itemPedido.quantidade;
    // if(this.pedido && !!this.pedido.cupons.filter(c => c.cupom.percentual)) {
    //   valorItem *= 1 - (this.pedido.cupons.find(c => c.cupom.percentual).cupom.percentual / 100);
    // }
    return valorItem;
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

  podeTrocar(pedido: SolicitacaoPedido) {
    console.log(pedido);
    return pedido.statusPedido && pedido.statusPedido.id == 4 && !pedido.trocaSolicitada;
  }

  solicitarTrocaPedidoSelecionado() {
    console.log(this.pedido);
    this.pedidoService.solicitarTroca(this.pedido)
      .subscribe(
          retorno => {
              const [ mensagem, idPedido ] = retorno.split(".");
              alert(mensagem);
              this.router.navigateByUrl('/meu-perfil/pedidos/confirmacao-troca/' + ''+idPedido.trim());
            },
            (err) => alert("Ocorreu um erro ao solicitar a troca do pedido")
          );
  }

  calcularValorTroca(pedido: SolicitacaoPedido) {
    const valorPedidos = pedido.itensPedido.filter(itemPedido => itemPedido.selecionado).map(itemPedido => itemPedido.produto.valor * itemPedido.quantidade).reduce((total, atual) => total += atual, 0)
    return valorPedidos * (1 - (pedido.cupons.find(cupom => !!cupom.cupom.percentual).cupom.percentual / 100));
  }

  teste(t: AbstractControl) {
    if(t) {
      console.log(typeof t);
      return t as FormControl;
    }
  }
}
