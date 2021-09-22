import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtoDetalhe?: Produto;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
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

  filtrarProdutos(
    produtoFiltro?: string,
    idCategoria?: number,
    autor?: string,
    isbn?: string,
    editora?: string,
    codigoBarras?: string
  ): Observable<Produto[]> {

    let params = new HttpParams();
    if(produtoFiltro) {
      params = params.append('produto', produtoFiltro)
    }
    if(idCategoria) {
      params = params.append('idCategoria', ''+idCategoria)
    }
    if(autor) {
      params = params.append('autor', autor)
    }
    if(isbn) {
      params = params.append('isbn', isbn)
    }
    if(editora) {
      params = params.append('editora', editora)
    }
    if(codigoBarras) {
      params = params.append('codigoBarras', codigoBarras)
    }
    return this.http.get<Produto[]>('http://localhost:8083/produtos/filtrar', {
      params: params
    });
  }

  obterProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:8083/produtos');
  }

  inativarProduto(produto: Produto) {
    return this.http.put(
      'http://localhost:8083/produtos/' + produto.id + '/inativar',{}, {
        responseType: 'text',
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      }
    );

  }

  ativarProduto(produto: Produto) {
    return this.http.put(
      'http://localhost:8083/produtos/' + produto.id + '/ativar',{}, {
        responseType: 'text',
        headers: {
          'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
        },
      }
    );
  }

  salvarProduto(produto: Produto) {
    if(produto.id) {
      return this.http.put(
        'http://localhost:8083/produtos/alterar/'+produto.id,
        {
          ...produto,
          anoEdicao: produto.ano,
          dimensao: {
            altura: produto.altura ? (''+produto.altura).replace(',', '.') : produto.altura,
            largura: produto.largura?  (''+produto.largura).replace(',', '.') : produto.largura,
            profundidade: produto.profundidade?  (''+produto.profundidade).replace(',', '.') : produto.profundidade,
            peso: produto.peso? (''+produto.peso).replace(',', '.') : produto.peso,
          }
        },
        {
          responseType: 'text',
          headers: {
            'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
          },
        }
      );

    } else {
      return this.http.post(
        'http://localhost:8083/produtos/cadastrar',
        {
          ...produto,
          anoEdicao: produto.ano,
          dimensao: {
            altura: produto.altura ? produto.altura.replace(',', '.') : produto.altura,
            largura: produto.largura?  produto.altura.replace(',', '.') : produto.altura,
            profundidade: produto.profundidade?  produto.profundidade.replace(',', '.') : produto.profundidade,
            peso: produto.peso? produto.peso.replace(',', '.') : produto.peso,
          }
        },
        {
          responseType: 'text',
          headers: {
            'Authorization': 'Basic ' + this.authStorageService.obterDadosAutenticacao().basicToken,
          },
        }
      );

    }
  }

}
