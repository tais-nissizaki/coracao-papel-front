import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador/administrador.component';
import { MainComponent } from './main/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    loadChildren: () => import('./main/main.module').then(module => module.MainModule)
  },
  {
    path: 'administrador',
    component: AdministradorComponent,
    loadChildren: () => import('./administrador/administrador.module').then(module => module.AdministradorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
