import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  colunasProdutos = ['titulo', 'quantidade', 'valor'];

  colunasTrasacoes = ['data', 'transacao'];

  constructor(
    public dialogRef: MatDialogRef<DetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public pedido: SolicitacaoPedido
  ) { }
  
  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
