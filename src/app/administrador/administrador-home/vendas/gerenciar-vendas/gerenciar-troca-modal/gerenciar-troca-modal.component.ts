import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gerenciar-troca-modal',
  templateUrl: './gerenciar-troca-modal.component.html',
  styleUrls: ['./gerenciar-troca-modal.component.css']
})
export class GerenciarTrocaModalComponent implements OnInit {

  colunas = ['produto', 'quantidade']

  constructor(
    public dialogRef: MatDialogRef<GerenciarTrocaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
  }

  fechar(operacao?: string) {
    this.dialogRef.close(operacao)
  }
}
