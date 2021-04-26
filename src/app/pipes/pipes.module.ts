import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatarDataPipe } from './formatar-data.pipe';
import { EnderecoCompletoPipe } from './endereco-completo.pipe';
import { CpfCnpjPipe } from './cpf-cnpj.pipe';

@NgModule({
  declarations: [
    FormatarDataPipe,
    EnderecoCompletoPipe,
    CpfCnpjPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormatarDataPipe,
    EnderecoCompletoPipe,
    CpfCnpjPipe,
  ],
})
export class PipesModule { }