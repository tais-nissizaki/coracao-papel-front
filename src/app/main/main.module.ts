import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HomeModule } from './home/home.module';
import { MainRoutingModule } from './main-routing.module';
import { ComponentsModule } from '../components/components.module';
import { MatFormFieldModule }from '@angular/material/form-field';
import { MatInputModule }from '@angular/material/input';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { EnderecoComponent } from './cadastro-cliente/endereco/endereco.component';

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    CadastroClienteComponent,
    EnderecoComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    ComponentsModule,
    HomeModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
})
export class MainModule { }
