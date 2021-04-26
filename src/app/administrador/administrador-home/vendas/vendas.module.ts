import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarVendasComponent } from './gerenciar-vendas/gerenciar-vendas.component';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { ExecutarAcaoComponent } from './gerenciar-vendas/executar-acao/executar-acao.component';
import { GerenciarTrocaModalComponent } from './gerenciar-vendas/gerenciar-troca-modal/gerenciar-troca-modal.component';
import { DetalhesComponent } from './gerenciar-vendas/detalhes/detalhes.component';

@NgModule({
  declarations: [GerenciarVendasComponent, ExecutarAcaoComponent, GerenciarTrocaModalComponent, DetalhesComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    PipesModule
  ]
})
export class VendasModule { }
