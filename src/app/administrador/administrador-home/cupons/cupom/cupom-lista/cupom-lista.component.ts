import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cupom-lista',
  templateUrl: './cupom-lista.component.html',
  styleUrls: ['./cupom-lista.component.css']
})
export class CupomListaComponent implements OnInit {

  @Input() cupons!: Cupom[];

  @Output() novoEvent = new EventEmitter();

  colunasExibidas: string[] = ['codigo', 'percentual_valor', 'inicio', 'fim'];

  constructor() { }

  ngOnInit(): void {
  }

  novo() {
    this.novoEvent.emit();
  }

}
