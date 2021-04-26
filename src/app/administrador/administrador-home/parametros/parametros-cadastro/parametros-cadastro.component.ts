import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametros-cadastro',
  templateUrl: './parametros-cadastro.component.html',
  styleUrls: ['./parametros-cadastro.component.css']
})
export class ParametrosCadastroComponent implements OnInit {

  tipoParametro: string = 'inativacao-automatica';

  constructor() { }

  ngOnInit(): void {
  }

}
