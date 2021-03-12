import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HomeModule } from './home/home.module';
import { MainRoutingModule } from './main-routing.module';
import { ComponentsModule } from '../components/components.module';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { EnderecoComponent } from './cadastro-cliente/endereco/endereco.component';
import { DocumentoComponent } from './cadastro-cliente/documento/documento.component';
import { PipesModule } from '../pipes/pipes.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    CadastroClienteComponent,
    EnderecoComponent,
    DocumentoComponent,
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
  ],
})
export class MainModule { }
