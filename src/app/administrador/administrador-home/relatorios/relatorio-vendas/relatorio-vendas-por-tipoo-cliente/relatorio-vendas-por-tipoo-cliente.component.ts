import { Component, OnInit } from '@angular/core';
import { RelatorioVendasService } from '../../../../../services/relatorio-vendas.service';

@Component({
  selector: 'app-relatorio-vendas-por-tipoo-cliente',
  templateUrl: './relatorio-vendas-por-tipoo-cliente.component.html',
  styleUrls: ['./relatorio-vendas-por-tipoo-cliente.component.css']
})
export class RelatorioVendasPorTipooClienteComponent implements OnInit {

  faturamentoPorTipoCliente: FaturamentoPorTipoCliente[] = []

  constructor(
    private relatorioVendasService: RelatorioVendasService
  ) { }

  ngOnInit(): void {
    this.relatorioVendasService
      .relatorioVendasPorTipoCliente()
      .subscribe(faturamentoPorTipoCliente => this.faturamentoPorTipoCliente = faturamentoPorTipoCliente);
  }

}
