import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JustificativaInativacaoData } from './justificativa.modal.data';
import { CategoriaInativacaoService } from '../../../../../services/categoria-inativacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-justificativa-inativacao',
  templateUrl: './justificativa-inativacao.component.html',
  styleUrls: ['./justificativa-inativacao.component.css']
})
export class JustificativaInativacaoComponent implements OnInit {

  @Input() inativacao = true;

  categorias: CategoriaInativacao[] = [];

  formJustificativa!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<JustificativaInativacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JustificativaInativacaoData,
    private justificativaInativacaoService: CategoriaInativacaoService,
    formBuilder: FormBuilder
  ) {
    this.formJustificativa = formBuilder.group({
      categoria: [null, Validators.required],
      justificativa: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.categorias = this.justificativaInativacaoService.obterJustificativas(this.data.inativacao);
  }

  categoriaEquals(option, value) {
    return value && value.id == option.id;
  }

  close() {
    this.dialogRef.close();
  }

  efetivar() {
    this.formJustificativa.markAllAsTouched();
    if(this.formJustificativa.valid) {
      this.dialogRef.close(this.data);
    }
  }

}
