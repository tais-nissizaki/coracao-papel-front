import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { ClientesComponent } from './clientes-consulta/clientes.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { EnderecoComponent } from './cliente-cadastro/endereco/endereco.component';
import { DocumentoComponent } from './cliente-cadastro/documento/documento.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { DetalheTransacaoComponent } from './transacoes/detalhe-transacao/detalhe-transacao.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    ClientesComponent,
    ClienteCadastroComponent,
    EnderecoComponent,
    DocumentoComponent,
    TransacoesComponent,
    DetalheTransacaoComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ClientesModule { }
