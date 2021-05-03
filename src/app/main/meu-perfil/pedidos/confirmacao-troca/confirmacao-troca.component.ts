import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-confirmacao-troca',
  templateUrl: './confirmacao-troca.component.html',
  styleUrls: ['./confirmacao-troca.component.css']
})
export class ConfirmacaoTrocaComponent implements OnInit {

  solicitacaoTroca?: SolicitacaoPedido;
  colunasDetalhePedido = ['produto', 'quantidade', 'valor']

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private pedidoService: PedidoService
  ) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(
      flatMap((param) => {
        const idPedidoTroca = param.get('idPedido');
        return this.pedidoService.obterPedido(Number(idPedidoTroca));
      })
    )
    .subscribe(pedido => {
      console.log(pedido)
      this.solicitacaoTroca = pedido
    });

    
    // of("foo")
    // .pipe(flatMap((t) => {
    //   alert(t)
    //   return of("bar")
    // }))
    // .subscribe(msg => alert(msg))
    
    // this.activatedRoute.paramMap.subscribe(params => {
      // this.clienteSevice.pesquisarCliente({id: +params.get('id')} as Cliente)

    // console.log(this.location.getState());
    // const pedido = window.history.state?.data;
    // if(pedido) {
    //   this.solicitacaoTroca = pedido;
    // } else {
    //   this.router.navigateByUrl('/meu-perfil/pedidos');
    // }
  }

}
