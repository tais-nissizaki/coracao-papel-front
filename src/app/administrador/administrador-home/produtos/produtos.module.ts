import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { ProdutosComponent } from './produtos-consulta/produtos.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutoCadastroComponent,

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ProdutosModule { }
