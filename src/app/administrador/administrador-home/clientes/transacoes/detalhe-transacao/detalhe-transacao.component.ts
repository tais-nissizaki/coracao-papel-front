import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhe-transacao',
  templateUrl: './detalhe-transacao.component.html',
  styleUrls: ['./detalhe-transacao.component.css']
})
export class DetalheTransacaoComponent implements OnInit {

  colunasProdutos = ['titulo', 'quantidade', 'valor'];

  colunasTrasacoes = ['data', 'transacao'];

  constructor(
    public dialogRef: MatDialogRef<DetalheTransacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public pedido: SolicitacaoPedido
  ) { }
  
  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
