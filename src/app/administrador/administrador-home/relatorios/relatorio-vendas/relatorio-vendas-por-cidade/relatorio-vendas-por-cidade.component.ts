import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { objectIdEquals } from '../../../../../core/objectIdEquals';
import { EnderecoService } from '../../../../../services/endereco.service';
import { RelatorioVendasService } from '../../../../../services/relatorio-vendas.service';

@Component({
  selector: 'app-relatorio-vendas-por-cidade',
  templateUrl: './relatorio-vendas-por-cidade.component.html',
  styleUrls: ['./relatorio-vendas-por-cidade.component.css']
})
export class RelatorioVendasPorCidadeComponent implements OnInit {

  formRelatorio!: FormGroup;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  objectIdEquals = objectIdEquals;
  resultadoRelatorio: FaturamentoPorCidade[] = [];
  submited = false;
  
  constructor(
    formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private relatorioVendasService: RelatorioVendasService
  ) { 
    this.formRelatorio = formBuilder.group({
      estado: [null, Validators.required],
      cidade: [null]
    })
  }

  ngOnInit(): void {
    this.enderecoService.obterEstados().subscribe(estados => this.estados = estados);
  }

  obterCidades() {
    const estado = this.formRelatorio.value.estado;
    this.enderecoService.obterCidades(estado.descricao)
          .subscribe(
            (retornoCidades) => {
              this.cidades = retornoCidades;
            }
          )
  }
  
  gerarRelatorio() {
    this.submited = true;
    console.log('gerarRelatorio()')
    this.formRelatorio.controls.estado.markAsTouched();
    if (this.formRelatorio.valid) {
      console.log('gerarRelatorio()', this.formRelatorio.valid)
      this.relatorioVendasService.relatorioVendasPorCidade(this.formRelatorio.value.estado, this.formRelatorio.value.cidade)
        .subscribe(resultado => {
          this.resultadoRelatorio = resultado;
        })
    } 
  }
}
