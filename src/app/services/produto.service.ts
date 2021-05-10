import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtoDetalhe?: Produto;

  constructor(
    private http: HttpClient
  ) {
  }

  
  obterProduto(idProduto: number): Observable<Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8083/produtos/'+idProduto);
  }

  pesquisarProduto(produto: Produto): Produto[]{
    return [
      {
        id: 1,
        titulo: 'O Código da Vinci',
        autor: 'Brown, Dan',
        valor: 49.90,
        caminhoImagem: '/assets/codigo_da_vinci.jpg'
      }
    ]
  }

  obterGrupoPrecificacao(): GrupoPrecificacao [] {
    return [
      {
        id: 1,
        nome: 'BRONZE',
        descricao: 'Bronze',
        margemLucro: 5,
      },
      {
        id: 2,
        nome: 'PRATA',
        descricao: 'Prata',
        margemLucro: 10,
      },
      {
        id: 3,
        nome: 'OURO',
        descricao: 'Ouro',
        margemLucro: 15,
      },
      {
        id: 4,
        nome: 'DIAMANTE',
        descricao: 'Diamante',
        margemLucro: 20,
      }
    ]
  }

  filtrarProdutos(produtoFiltro: string): Observable<Produto[]> {
    let params = {
      produto: produtoFiltro,
    };
    return this.http.get<Produto[]>('http://localhost:8083/produtos/filtrar', {
      params: params
    });
  }

  obterProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:8083/produtos');
  }


}