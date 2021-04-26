import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RelatorioVendasService } from '../../../../../services/relatorio-vendas.service';

@Component({
  selector: 'app-relatorio-vendas-por-faixa-etaria',
  templateUrl: './relatorio-vendas-por-faixa-etaria.component.html',
  styleUrls: ['./relatorio-vendas-por-faixa-etaria.component.css']
})
export class RelatorioVendasPorFaixaEtariaComponent implements OnInit {

  formRelatorio!: FormGroup;
  faturamentoPorFaixaEtaria: FaturamentoPorFaixaEtaria[] = [];

  constructor(
    formBuilder: FormBuilder,
    private relatorioVendasService: RelatorioVendasService
  ) {
    this.formRelatorio = formBuilder.group({
      faixaEtaria: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.relatorioVendasService
      .relatorioVendasPorFaixaEtaria()
      .subscribe(faturamentoPorFaixaEtaria => this.faturamentoPorFaixaEtaria = faturamentoPorFaixaEtaria);
  }

}
