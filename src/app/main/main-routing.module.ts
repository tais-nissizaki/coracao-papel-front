import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { PagamentoComponent } from './carrinho/pagamento/pagamento.component';
import { PedidoRealizadoComponent } from './carrinho/pedido-realizado/pedido-realizado.component';
import { LoginComponent } from './login/login.component';
import { CuponsComponent } from './meu-perfil/cupons/cupons.component';
import { DadosBasicosComponent } from './meu-perfil/dados-basicos/dados-basicos.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { ConfirmacaoTrocaComponent } from './meu-perfil/pedidos/confirmacao-troca/confirmacao-troca.component';
import { PedidosComponent } from './meu-perfil/pedidos/pedidos.component';
import { ClienteAuthGuardService } from '../services/cliente-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'cadastro',
        component: CadastroClienteComponent,
      },
      {
        path: 'carrinho',
        component: CarrinhoComponent,
      },
      {
        path: 'pagamento',
        component: PagamentoComponent,
      },
      {
        path: 'pedido-realizado/:idPedido',
        component: PedidoRealizadoComponent,
      },
      {
        path: 'meu-perfil',
        component: MeuPerfilComponent,
        canActivate: [ClienteAuthGuardService],
        children:[
          {
            path: 'pedidos',
            component: PedidosComponent,
            canActivate: [ClienteAuthGuardService]
          },
          {
            path: 'pedidos/confirmacao-troca',
            component: ConfirmacaoTrocaComponent,
            canActivate: [ClienteAuthGuardService]
          },
          {
            path: 'dados-basicos',
            component: DadosBasicosComponent,
            canActivate: [ClienteAuthGuardService]
          },
          {
            path: 'meus-cupons',
            component: CuponsComponent,
            canActivate: [ClienteAuthGuardService]
          },
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
