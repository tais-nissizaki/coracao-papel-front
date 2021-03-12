import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { ComponentsModule } from '../components/components.module';
import { ClientesModule } from './administrador-home/clientes/clientes.module';
import { AdministradorHomeComponent } from './administrador-home/administrador-home.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AdministradorComponent,
    AdministradorHomeComponent,
    LoginComponent,
  ],
  imports: [
    AdministradorRoutingModule,
    CommonModule,
    ComponentsModule,
    ClientesModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AdministradorModule { }
