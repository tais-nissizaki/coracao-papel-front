import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
import pedidos from './pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private authStorageService: AuthStorageService,
    private http: HttpClient,
  ) { }

  pedidosAdministrativos: Pedido[] = pedidos;

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

  consultarPedidos(dataInicialFiltro?: Date, dataFinalFitlro?: Date, idStatusPedido?: number) {
    console.log(dataInicialFiltro, dataFinalFitlro, idStatusPedido);
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
    if (usuario.permissoes.includes('CLIENTE')) {
      url = 'http://localhost:8083/pedidos/cliente/' + usuario.idCliente;
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
  
  obterPedidosPorFiltro(idStatus: number): Observable<Pedido[]> {
    const pedidos = this.pedidosAdministrativos.filter(pedido => pedido.status.id == idStatus);

    return new Observable(subscriber => subscriber.next(pedidos));
  }

  obterPedidos(idCliente: number): Observable<Pedido[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          numero: 1235,
          dataEntrega: new Date(),
          dataPedido: new Date(),
          valorFrete: 15.95,
          valorPedido: 55.85,
          enderecoEntrega: {
            id: 12,
            logradouro: 'Rua Braz Cubas',
            numero: '10',
            complemento: 'Casa 2',
            bairro: 'Centro',
            cidade: {
              id: 12,
              descricao: 'Mogi das Cruzes',
              estado: {
                id: 12,
                descricao: 'SP'
              }
            },
            cep: '08780123',
            identificadorEndereco: 'Teste',
            tipoEndereco: {
              id: 1,
              descricao: 'Entrega',
              nome: 'ENTREGA'
            },
            tipoLogradouro: 'Rua',
            tipoResidencia: {
              id: 1,
              nome: 'CASA',
              descricao: 'Casa'
            },
          },
          produtos:  [
            {
              quantidade: 1,
              produto: {
                id: 1,
                autor: 'King, Stephen',
                titulo: 'O Iluminado',
                valor: 59.90,
              }
            }
          ],
          status: {
            id: 2,
            nome: 'APROVADO',
            descricao: 'Aprovado'
          },
          transacoes: [
            {
              id: 1,
              data: new Date(2021, 2, 1),
              descricao: 'Aguardando pagamento'
            },
            {
              id: 1,
              data: new Date(2021, 2, 1),
              descricao: 'Pagamento aprovado'
            },
          ]
        },
      ]);
    })
  }
}
