import { Component, OnInit } from '@angular/core';
import { CupomService } from '../../../services/cupom.service';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {

  periodo = '1';

  cupons: Cupom[] = [];

  colunas= ['codigo', 'valor', 'dataExpiracao', 'situacao']

  constructor(
    private cupomService: CupomService
  ) { }

  ngOnInit(): void {
    this.cupons = this.cupomService.obterCuponsCliente(1);
    this.periodo = '1';
  }

}
