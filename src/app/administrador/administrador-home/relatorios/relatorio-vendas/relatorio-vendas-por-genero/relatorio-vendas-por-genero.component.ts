import { Component, OnInit } from '@angular/core';
import { RelatorioVendasService } from '../../../../../services/relatorio-vendas.service';

@Component({
  selector: 'app-relatorio-vendas-por-genero',
  templateUrl: './relatorio-vendas-por-genero.component.html',
  styleUrls: ['./relatorio-vendas-por-genero.component.css']
})
export class RelatorioVendasPorGeneroComponent implements OnInit {

  faturamentoPorGenero: FaturamentoPorGenero[] = []

  constructor(
    private relatporioVendasService: RelatorioVendasService
  ) { }

  ngOnInit(): void {
    this.relatporioVendasService
      .relatorioVendasPorGenero()
      .subscribe(faturamentoPorGenero => this.faturamentoPorGenero = faturamentoPorGenero);
  }

}
