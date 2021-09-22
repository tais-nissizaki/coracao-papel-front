import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HomeModule } from './home/home.module';
import { MainRoutingModule } from './main-routing.module';
import { ComponentsModule } from '../components/components.module';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { PipesModule } from '../pipes/pipes.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ItensCarrinhoComponent } from './carrinho/itens-carrinho/itens-carrinho.component';
import { EntregaComponent } from './carrinho/entrega/entrega.component';
import { PagamentoComponent } from './carrinho/pagamento/pagamento.component';
import { CartoesComponent } from './carrinho/pagamento/cartoes/cartoes.component';
import { PedidoRealizadoComponent } from './carrinho/pedido-realizado/pedido-realizado.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { PedidosComponent } from './meu-perfil/pedidos/pedidos.component';
import { DadosBasicosComponent } from './meu-perfil/dados-basicos/dados-basicos.component';
import { ConfirmacaoTrocaComponent } from './meu-perfil/pedidos/confirmacao-troca/confirmacao-troca.component';
import { CuponsComponent } from './meu-perfil/cupons/cupons.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EnderecosComponent } from './meu-perfil/enderecos/enderecos.component';
import { AlterarSenhaComponent } from './meu-perfil/alterar-senha/alterar-senha.component';
import { CartoesClienteComponent } from './meu-perfil/cartoes-cliente/cartoes-cliente.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    CadastroClienteComponent,
    CarrinhoComponent,
    ItensCarrinhoComponent,
    EntregaComponent,
    PagamentoComponent,
    CartoesComponent,
    PedidoRealizadoComponent,
    MeuPerfilComponent,
    PedidosComponent,
    DadosBasicosComponent,
    ConfirmacaoTrocaComponent,
    CuponsComponent,
    EnderecosComponent,
    AlterarSenhaComponent,
    CartoesClienteComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    ComponentsModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
  ],
})
export class MainModule { }
