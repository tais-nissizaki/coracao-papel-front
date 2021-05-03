import { Component, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { CupomService } from '../../../services/cupom.service';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {

  periodo: {texto: string, calcularData: (data: Date) => void};
  periodos = [
    {
      texto: '1 mês',
      calcularData: (data: Date) => data.setMonth(data.getMonth()-1)
    },
    {
      texto: '2 meses',
      calcularData: (data: Date) => data.setMonth(data.getMonth()-2)
    },
    {
      texto: '6 meses',
      calcularData: (data: Date) => data.setMonth(data.getMonth()-6)
    },
    {
      texto: '1 ano',
      calcularData: (data: Date) => data.setFullYear(data.getFullYear()-1)
    },
  ];

  cuponsCliente: CupomCliente[] = [];

  colunas= ['codigo', 'valor', 'dataInicioVigencia', 'dataExpiracao', 'situacao']

  constructor(
    private cupomService: CupomService
  ) { }

  ngOnInit(): void {
    this.periodo = this.periodos[0];
    const periodoFinal = new Date();
    let periodoInicial = new Date()
    this.periodo.calcularData(periodoInicial);
    this.cupomService.obterCuponsCliente(periodoInicial, periodoFinal)
      .subscribe(cuponsCliente => this.cuponsCliente = cuponsCliente.filter(cupomCliente => !!cupomCliente?.cupom.valor));
  }

}
