import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorHomeComponent } from './administrador-home/administrador-home.component';
import { ClienteCadastroComponent } from './administrador-home/clientes/cliente-cadastro/cliente-cadastro.component';
import { ClientesComponent } from './administrador-home/clientes/clientes-consulta/clientes.component';
import { ProdutoCadastroComponent } from './administrador-home/produtos/produto-cadastro/produto-cadastro.component';
import { ProdutosComponent } from './administrador-home/produtos/produtos-consulta/produtos.component';
import { DashboardComponent } from './administrador-home/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ParametrosCadastroComponent } from './administrador-home/parametros/parametros-cadastro/parametros-cadastro.component';
import { GerenciarVendasComponent } from './administrador-home/vendas/gerenciar-vendas/gerenciar-vendas.component';
import { CupomComponent } from './administrador-home/cupons/cupom/cupom.component';
import { TransacoesComponent } from './administrador-home/clientes/transacoes/transacoes.component';
import { EstoqueComponent } from './administrador-home/estoque/estoque.component';
import { RelatoriosComponent } from './administrador-home/relatorios/relatorios.component';
import { RelatorioEstoqueComponent } from './administrador-home/relatorios/relatorio-estoque/relatorio-estoque.component';
import { RelatorioClientesComponent } from './administrador-home/relatorios/relatorio-clientes/relatorio-clientes.component';
import { RelatorioVendasComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas.component';
import { RelatorioClientesEstadoComponent } from './administrador-home/relatorios/relatorio-clientes-estado/relatorio-clientes-estado.component';
import { RelatorioClientesCidadeComponent } from './administrador-home/relatorios/relatorio-clientes-cidade/relatorio-clientes-cidade.component';
import { RelatorioVendasPorEstadoComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-estado/relatorio-vendas-por-estado.component';
import { RelatorioVendasPorCidadeComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-cidade/relatorio-vendas-por-cidade.component';
import { RelatorioVendasPorFaixaEtariaComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-faixa-etaria/relatorio-vendas-por-faixa-etaria.component';
import { RelatorioVendasPorGeneroComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-genero/relatorio-vendas-por-genero.component';
import { RelatorioVendasPorTipooClienteComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-tipoo-cliente/relatorio-vendas-por-tipoo-cliente.component';
import { RelatorioVendasPorPeriodoComponent } from './administrador-home/relatorios/relatorio-vendas/relatorio-vendas-por-periodo/relatorio-vendas-por-periodo.component';
import { AdminAuthGuardService } from '../services/admin-auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AdministradorHomeComponent,
    canActivate: [ AdminAuthGuardService ],
    children:[
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'clientes/cadastro/:id',
        component: ClienteCadastroComponent,
      },
      {
        path: 'clientes/:id/transacoes',
        component: TransacoesComponent,
      },
      {
        path: 'produtos',
        component: ProdutosComponent,
      },
      {
        path: 'produtos/cadastro/:id',
        component: ProdutoCadastroComponent,
      },
      {
        path: 'produtos/cadastro',
        component: ProdutoCadastroComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'parametros',
        component: ParametrosCadastroComponent,
      },
      {
        path: 'vendas',
        component: GerenciarVendasComponent,
      },
      {
        path: 'cupons',
        component: CupomComponent,
      },
      {
        path: 'estoque',
        component: EstoqueComponent,
      },
      {
        path: 'relatorios',
        component: RelatoriosComponent,
        children: [
          {
            path: 'clientes',
            component: RelatorioClientesComponent
          },
          {
            path: 'clientes-por-estado',
            component: RelatorioClientesEstadoComponent
          },
          {
            path: 'clientes-por-cidade',
            component: RelatorioClientesCidadeComponent
          },
          {
            path: 'estoque',
            component: RelatorioEstoqueComponent
          },
          {
            path: 'vendas',
            component: RelatorioVendasComponent,
            children: [
              {
                path: 'por-estado',
                component: RelatorioVendasPorEstadoComponent
              },
              {
                path: 'por-cidade',
                component: RelatorioVendasPorCidadeComponent
              },
              {
                path: 'por-faixa-etaria',
                component: RelatorioVendasPorFaixaEtariaComponent
              },
              {
                path: 'por-genero',
                component: RelatorioVendasPorGeneroComponent
              },
              {
                path: 'por-tipo-cliente',
                component: RelatorioVendasPorTipooClienteComponent
              },
              {
                path: 'por-periodo',
                component: RelatorioVendasPorPeriodoComponent
              }
            ]
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule {}
