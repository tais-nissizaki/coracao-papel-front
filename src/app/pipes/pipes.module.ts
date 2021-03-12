import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatarDataPipe } from './formatar-data.pipe';

@NgModule({
  declarations: [
    FormatarDataPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormatarDataPipe,
  ],
})
export class PipesModule { }