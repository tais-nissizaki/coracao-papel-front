import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from '../../../../services/endereco.service';
import { objectIdEquals } from '../../../../core/objectIdEquals';

@Component({
  selector: 'app-relatorio-clientes-cidade',
  templateUrl: './relatorio-clientes-cidade.component.html',
  styleUrls: ['./relatorio-clientes-cidade.component.css']
})
export class RelatorioClientesCidadeComponent implements OnInit {

  formRelatorio!: FormGroup;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  estadoEquals = objectIdEquals;
  resultadoRelatorio: FaturamentoPorCidade[] = []

  constructor(
    formBuilder: FormBuilder,
    private enderecoService: EnderecoService
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

  get estado() {
    return this.formRelatorio.value.estado;
  }

  gerarRelatorio() {
    
  }

}
