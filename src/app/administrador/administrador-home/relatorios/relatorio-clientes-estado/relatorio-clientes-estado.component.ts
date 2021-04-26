import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../../../../services/relatorio.service';

@Component({
  selector: 'app-relatorio-clientes-estado',
  templateUrl: './relatorio-clientes-estado.component.html',
  styleUrls: ['./relatorio-clientes-estado.component.css']
})
export class RelatorioClientesEstadoComponent implements OnInit {

  quantidadesPorEstado: QuantidadePorEstado[] = [];

  constructor(
    private relatorioService: RelatorioService
  ) { }

  ngOnInit(): void {
    this.relatorioService
      .clientesObterQuantidadePorEstado()
      .subscribe(
        quantidadesPorEstado => this.quantidadesPorEstado = quantidadesPorEstado
      );
  }

}
