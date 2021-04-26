import { Component, OnInit } from '@angular/core';
import { RelatorioVendasService } from '../../../../../services/relatorio-vendas.service';

@Component({
  selector: 'app-relatorio-vendas-por-estado',
  templateUrl: './relatorio-vendas-por-estado.component.html',
  styleUrls: ['./relatorio-vendas-por-estado.component.css']
})
export class RelatorioVendasPorEstadoComponent implements OnInit {

  faturamentos: FaturamentoPorEstado[] = [];

  constructor(
    private relatorioVendasService: RelatorioVendasService
  ) { }

  ngOnInit(): void {
    this.relatorioVendasService.relatorioVendasPorEstado()
      .subscribe(retornoRelatorio => this.faturamentos = retornoRelatorio);
  }

}
