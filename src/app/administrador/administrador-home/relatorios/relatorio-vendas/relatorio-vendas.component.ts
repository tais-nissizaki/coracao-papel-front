import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorio-vendas',
  templateUrl: './relatorio-vendas.component.html',
  styleUrls: ['./relatorio-vendas.component.css']
})
export class RelatorioVendasComponent implements OnInit {

  tipoRelatorio: string|null = null;
  rotaPorTipo: Map<string, string> = new Map();

  constructor(
    private router: Router
  ) {
    this.rotaPorTipo
      .set('POR_ESTADO', '/administrador/relatorios/vendas/por-estado')
      .set('POR_CIDADE', '/administrador/relatorios/vendas/por-cidade')
      .set('POR_FAIXA_ETARIA', '/administrador/relatorios/vendas/por-faixa-etaria')
      .set('POR_GENERO', '/administrador/relatorios/vendas/por-genero')
      .set('POR_TIPO_DE_CLIENTE', '/administrador/relatorios/vendas/por-tipo-cliente')
      .set('FATURAMENTO_MENSAL', '/administrador/relatorios/vendas/por-periodo')
      .set('FATURAMENTO_POR_LIVRO', '')
      .set('VENDAS_POR_LIVRO', '');
  }

  ngOnInit(): void {
  }

  abrirRelatorio() {
    this.router.navigateByUrl(this.rotaPorTipo.get(this.tipoRelatorio));
  }

}
