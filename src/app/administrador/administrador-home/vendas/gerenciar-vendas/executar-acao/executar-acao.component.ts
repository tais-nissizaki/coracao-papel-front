import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-executar-acao',
  templateUrl: './executar-acao.component.html',
  styleUrls: ['./executar-acao.component.css']
})
export class ExecutarAcaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExecutarAcaoComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
  }

  fechar(resultado: boolean) {
    this.dialogRef.close(resultado);
  }

}
