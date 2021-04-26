import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrosCadastroComponent } from './parametros-cadastro/parametros-cadastro.component';
import { ComponentsModule } from '../../../components/components.module';
import { InativacaoAutomaticaComponent } from './parametros-cadastro/inativacao-automatica/inativacao-automatica.component';
import { RetiradaCarrinhoComponent } from './parametros-cadastro/retirada-carrinho/retirada-carrinho.component';
import { GrupoPrecificacaoComponent } from './parametros-cadastro/grupo-precificacao/grupo-precificacao.component';



@NgModule({
  declarations: [ParametrosCadastroComponent, InativacaoAutomaticaComponent, RetiradaCarrinhoComponent, GrupoPrecificacaoComponent],
  imports: [
    ComponentsModule,
    CommonModule
  ]
})
export class ParametrosModule { }
