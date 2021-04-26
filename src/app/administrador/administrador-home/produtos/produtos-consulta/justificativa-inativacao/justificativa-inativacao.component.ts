import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JustificativaInativacaoData } from './justificativa.modal.data';
import { CategoriaInativacaoService } from '../../../../../services/categoria-inativacao.service';
@Component({
  selector: 'app-justificativa-inativacao',
  templateUrl: './justificativa-inativacao.component.html',
  styleUrls: ['./justificativa-inativacao.component.css']
})
export class JustificativaInativacaoComponent implements OnInit {

  @Input() inativacao = true;

  categorias: CategoriaInativacao[] = [];

  constructor(
    public dialogRef: MatDialogRef<JustificativaInativacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JustificativaInativacaoData,
    private justificativaInativacaoService: CategoriaInativacaoService,
  ) { }

  ngOnInit(): void {
    this.categorias  = this.justificativaInativacaoService.obterJustificativas(this.inativacao);
  }

  categoriaEquals(option, value) {
    return value && value.id == option.id;
  }

  close() {
    this.dialogRef.close();
  }

}
