import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-realizado',
  templateUrl: './pedido-realizado.component.html',
  styleUrls: ['./pedido-realizado.component.css']
})
export class PedidoRealizadoComponent implements OnInit {

  // dataEntrega: Date = new Date();

  solicitacaoPedido: SolicitacaoPedido = {
    enderecoEntrega: {
      endereco: {} as Endereco
    } as Entrega
  } as SolicitacaoPedido;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .pipe(
        mergeMap(params =>  this.pedidoService.obterPedido(Number(params.get('idPedido'))))
      )
      .subscribe(solicitacaoPedido => this.solicitacaoPedido = solicitacaoPedido);
  }

  get dataEntrega() {
    if(this.solicitacaoPedido && this.solicitacaoPedido.dtCadastro) {
      const dataPrevista = new Date(this.solicitacaoPedido.dtCadastro).getTime() + (7*24*60*60*1000); //(7 dias * 24 horas * 60 minutos * 60 segundos * 1000 millisegundos)
      return  new Date(dataPrevista);
    }
    return null;
  }

}
