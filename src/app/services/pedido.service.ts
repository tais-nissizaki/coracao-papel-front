import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private authStorageService: AuthStorageService,
    private http: HttpClient,
  ) { }

  efetuarPedido(carrinho: Carrinho, formasPagamento: FormaPagamento[], cupons: Cupom[], valorTotal: number, valorFrete: number): Observable<string> {
    const solicitacaoPedido: SolicitacaoPedido = {
      cliente: {
        id: this.authStorageService.obterDadosAutenticacao().idCliente
      },
      cupons: cupons.map(cupom => {
        return {
          cupom: cupom
        }
      }),
      enderecoEntrega: {
        valorFrete: Math.round(valorFrete * 100) / 100,
        endereco: carrinho.enderecoSelecionado,
      },
      itensPedido: carrinho.itensCarrinho.map(itemCarrinho => ({
        produto: itemCarrinho.produto,
        quantidade: itemCarrinho.quantidade,
      })),
      pedidoPagamentos: formasPagamento.map(formaPagamento => ({
        valor: Math.round(formaPagamento.valor * 100) / 100,
        cartao: {
          ...formaPagamento.cartao,
          dataValidade: this.formatarValidadeCartao(formaPagamento.cartao.validade)
        },
      })),
      valorTotal: Math.round(valorTotal * 100) / 100,
      status: { id: 1 } as StatusPedido
    }
    return this.http.post<string>('http://localhost:8083/pedidos', solicitacaoPedido, {
      headers: {
        'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
      },
      responseType: 'text' as 'json'
    });
  }

  obterPedido(idPedido: number) {
    return this.http.get<SolicitacaoPedido>('http://localhost:8083/pedidos/' + idPedido, {
      headers: {
        'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
      },
    });
  }

  consultarPedidos(dataInicialFiltro?: Date, dataFinalFitlro?: Date, idStatusPedido?: number, idCliente?: number) {
    const usuario = this.authStorageService.obterDadosAutenticacao();
    let url = '';
    let params = {
      dtInicioFiltro: '',
      dtFimFiltro: '',
      idStatusPedido: '',
    };
    if (dataInicialFiltro) {
      params.dtInicioFiltro = dataInicialFiltro.toISOString();
    }
    if (dataFinalFitlro) {
      params.dtFimFiltro = dataFinalFitlro.toISOString();
    }
    if (idStatusPedido) {
      params.idStatusPedido = idStatusPedido.toString();
    }
    if (this.authStorageService.ehUsuarioCliente() || idCliente) {
      url = 'http://localhost:8083/pedidos/cliente/' + (usuario.idCliente || idCliente);
    } else {
      url = 'http://localhost:8083/pedidos';
    }
    return this.http.get<SolicitacaoPedido[]>(url, {
        params: params,
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  obterStatusPedido(): Observable<StatusPedido[]> {
    return this.http.get<StatusPedido[]>('http://localhost:8083/status-pedido');
  }

  private formatarValidadeCartao(validadeCartao: string) {
    //Formata do formato recebido mmyyyy no formato yyyy-mm-dd
    return validadeCartao.substring(2) + '-' + validadeCartao.substring(0,2) + '-01';
  }

  aprovarPagamentoPedido(pedido: SolicitacaoPedido) {
    return this.http.put<string>('http://localhost:8083/pedidos/aprovar-pagamento/' + pedido.id, {}, {
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  enviarPedido(pedido: SolicitacaoPedido) {
    return this.http.put<string>('http://localhost:8083/pedidos/enviar-pedido/' + pedido.id, {}, {
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  entregarPedido(pedido: SolicitacaoPedido) {
    return this.http.put<string>('http://localhost:8083/pedidos/pedido-entregue/' + pedido.id, {}, {
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  aprovarTrocaDoPedido(pedido: SolicitacaoPedido) {
    return this.http.put<string>('http://localhost:8083/pedidos/aprovar-troca-pedido/' + pedido.id, {}, {
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  finalizarTrocaDoPedido(pedido: SolicitacaoPedido, retornarProdutosEstoque: boolean) {
    const params = {
      'retornar-ao-estoque': String(retornarProdutosEstoque)
    };
    return this.http.put<string>('http://localhost:8083/pedidos/finalizar-troca-pedido/' + pedido.id, {}, {
        params: params,
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      });
  }

  solicitarTroca(pedido: SolicitacaoPedido) {
    let todosSelecionados = true;
    pedido.itensPedido.forEach(itemPedido => {
      if(!itemPedido.selecionado) {
        todosSelecionados = false;
      }
    });

    let url = '';
    let pedidoTroca: SolicitacaoPedido = null;
    if(todosSelecionados) {
      url = 'http://localhost:8083/pedidos/trocar-pedido/' + pedido.id;
      pedidoTroca = pedido;
    } else {
      url = 'http://localhost:8083/pedidos/trocar-itens-pedido/' + pedido.id;
      const itensTroca = pedido.itensPedido.filter(itemPedido => itemPedido.selecionado);
      let valorTroca = 0;

      let coeficienteCupomDesconto = 1;
      if(pedido.cupons.find(c => !!c.cupom.percentual)) {
        coeficienteCupomDesconto = 1 - (pedido.cupons.find(c => !!c.cupom.percentual).cupom.percentual / 100);
      }
      itensTroca.forEach(itemTroca => valorTroca += (itemTroca.quantidade * itemTroca.produto.valor));
      pedidoTroca = {
        ...pedido,
        itensPedido: itensTroca,
        valorTotal:  (valorTroca * coeficienteCupomDesconto)
      };
    }

    return this.http.put<string>(url, pedidoTroca, {
      headers: {
        'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
      },
      responseType: 'text' as 'json'
    })
  }
}
