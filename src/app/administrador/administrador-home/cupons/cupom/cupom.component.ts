import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.component.html',
  styleUrls: ['./cupom.component.css']
})
export class CupomComponent implements OnInit {

  cupons: Cupom[] = [{
    codigo: 'PROMODAY10',
    inicioCampanha: new Date(2021, 2, 1),
    percentual: 10.0,
    fimCampanha: new Date(2021, 2, 31),
    utilizado: false
  }];

  cupomEdicao?: Cupom;

  modoEdicao: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrirNovo() {
    this.modoEdicao = true;
  }

  cancelarEdicao() {
    this.modoEdicao = false;
  }

}
