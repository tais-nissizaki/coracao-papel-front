import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';

const routes: Routes = [
  {
    
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProdutosListaComponent,
      },
      {
        path: 'produto/:id',
        component: ProdutoDetalheComponent,
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }