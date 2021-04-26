import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cupom-cadastro',
  templateUrl: './cupom-cadastro.component.html',
  styleUrls: ['./cupom-cadastro.component.css']
})
export class CupomCadastroComponent implements OnInit {

  @Output() cancelarEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
