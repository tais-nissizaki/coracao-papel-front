import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RelatorioVendasService } from 'src/app/services/relatorio-vendas.service';

@Component({
  selector: 'app-relatorio-vendas-por-periodo',
  templateUrl: './relatorio-vendas-por-periodo.component.html',
  styleUrls: ['./relatorio-vendas-por-periodo.component.css']
})
export class RelatorioVendasPorPeriodoComponent implements OnInit {

  formRelatorio!: FormGroup;
  faturamentoPorPeriodo: FaturamentoPorPeriodo[] = [];
  submetido = false;
  constructor(
    formBuilder: FormBuilder,
    private relatorioVendasService: RelatorioVendasService
  ) {
    
    this.formRelatorio = formBuilder.group({
      periodo: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  gerarRelatorio(){
    this.submetido = true;
    this.formRelatorio.controls.periodo.markAsTouched();
    if(this.formRelatorio.valid) {
      this.relatorioVendasService
        .relatorioVendasPorPeriodo(this.formRelatorio.value.periodo)
        .subscribe(faturamentoPorPeriodo => this.faturamentoPorPeriodo = faturamentoPorPeriodo)
    }
  }

}
