import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { ComponentsModule } from '../components/components.module';
import { ClientesModule } from './administrador-home/clientes/clientes.module';
import { ProdutosModule } from './administrador-home/produtos/produtos.module';
import { ParametrosModule } from './administrador-home/parametros/parametros.module';
import { VendasModule } from './administrador-home/vendas/vendas.module'
import { DashboardComponent } from './administrador-home/dashboard/dashboard.component';
import { AdministradorHomeComponent } from './administrador-home/administrador-home.component';
import { CuponsModule } from './administrador-home/cupons/cupons.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { JustificativaInativacaoComponent } from './administrador-home/produtos/produtos-consulta/justificativa-inativacao/justificativa-inativacao.component';
import { EstoqueComponent } from './administrador-home/estoque/estoque.component';
import { EntradaComponent } from './administrador-home/estoque/entrada/entrada.component';
import { SaidaComponent } from './administrador-home/estoque/saida/saida.component';
import { PipesModule } from '../pipes/pipes.module';
import { RelatoriosComponent } from './administrador-home/relatorios/relatorios.component';
import { RelatorioVendasComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas.component';
import { RelatorioClientesComponent } from './administrador-home/relatorios/relatorio-clientes/relatorio-clientes.component';
import { RelatorioEstoqueComponent } from './administrador-home/relatorios/relatorio-estoque/relatorio-estoque.component';
import { RelatorioClientesEstadoComponent } from './administrador-home/relatorios/relatorio-clientes-estado/relatorio-clientes-estado.component';
import { RelatorioClientesCidadeComponent } from './administrador-home/relatorios/relatorio-clientes-cidade/relatorio-clientes-cidade.component';
import { RelatorioVendasPorEstadoComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-estado/relatorio-vendas-por-estado.component';
import { RelatorioVendasPorCidadeComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-cidade/relatorio-vendas-por-cidade.component';
import { RelatorioVendasPorFaixaEtariaComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-faixa-etaria/relatorio-vendas-por-faixa-etaria.component';
import { RelatorioVendasPorGeneroComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-genero/relatorio-vendas-por-genero.component';
import { RelatorioVendasPorTipooClienteComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-tipoo-cliente/relatorio-vendas-por-tipoo-cliente.component';
import { RelatorioVendasPorPeriodoComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-periodo/relatorio-vendas-por-periodo.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AdministradorComponent,
    AdministradorHomeComponent,
    LoginComponent,
    DashboardComponent,
    JustificativaInativacaoComponent,
    EstoqueComponent,
    EntradaComponent,
    SaidaComponent,
    RelatoriosComponent,
    RelatorioVendasComponent,
    RelatorioClientesComponent,
    RelatorioEstoqueComponent,
    RelatorioClientesEstadoComponent,
    RelatorioClientesCidadeComponent,
    RelatorioVendasPorEstadoComponent,
    RelatorioVendasPorCidadeComponent,
    RelatorioVendasPorFaixaEtariaComponent,
    RelatorioVendasPorGeneroComponent,
    RelatorioVendasPorTipooClienteComponent,
    RelatorioVendasPorPeriodoComponent,
  ],
  imports: [
    AdministradorRoutingModule,
    CommonModule,
    ComponentsModule,
    ClientesModule,
    ProdutosModule,
    ParametrosModule,
    VendasModule,
    CuponsModule,
    PipesModule,
    NgxMaskModule.forRoot(),  
  ]
})
export class AdministradorModule { }
