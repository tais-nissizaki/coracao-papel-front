import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { ProdutoComponent } from './produtos-lista/produto/produto.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProdutosListaComponent,
    ProdutoComponent,
    ProdutoDetalheComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule
  ]
})
export class HomeModule {

}
