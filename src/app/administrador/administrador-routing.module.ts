import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorHomeComponent } from './administrador-home/administrador-home.component';
import { ClienteCadastroComponent } from './administrador-home/clientes/cliente-cadastro/cliente-cadastro.component';
import { ClientesComponent } from './administrador-home/clientes/clientes-consulta/clientes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AdministradorHomeComponent,
    children:[
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'clientes/cadastro/:id',
        component: ClienteCadastroComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule {}