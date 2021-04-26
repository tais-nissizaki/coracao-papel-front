import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { CupomComponent } from './cupom/cupom.component';
import { CupomListaComponent } from './cupom/cupom-lista/cupom-lista.component';
import { CupomCadastroComponent } from './cupom/cupom-cadastro/cupom-cadastro.component';


@NgModule({
  declarations: [
    CupomComponent,
    CupomListaComponent,
    CupomCadastroComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
  ]
})
export class CuponsModule { }
