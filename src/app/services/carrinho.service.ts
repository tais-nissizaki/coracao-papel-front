import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { CarrinhoStorageService } from '../services/carrinho-storage.service';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(
    private carrinhoStorageService: CarrinhoStorageService,
    private authStorageService: AuthStorageService,
    private http: HttpClient
  ) {}

  adicionarProduto(produto: Produto): Observable<Carrinho> {
    return this.obterDadosCarrinho()
      .pipe(
        map(
          carrinho => {
            if (carrinho && carrinho.itensCarrinho && carrinho.itensCarrinho.length > 0) {
              const itemEncontrado = carrinho.itensCarrinho.find(itemCarrinho => itemCarrinho.produto.id === produto.id);
              if(itemEncontrado) {
                return {carrinho: carrinho, continua: false};
              }
            }
            return {carrinho: carrinho, continua: true};
          }
        ),
        flatMap(({carrinho, continua}) => {
          if(!continua) {
            return of(carrinho);
          } 
          const informacaoUsuario = this.authStorageService.obterDadosAutenticacao();
          const idCliente = informacaoUsuario && informacaoUsuario.idCliente ? informacaoUsuario.idCliente : null;
          const itemCarrinho: ItemCarrinho = {
            quantidade: 1,
            produto: produto
          };
          let url;
          if (carrinho && carrinho.id && carrinho.id > 0) {
            url = 'http://localhost:8083/carrinho/' + carrinho.id;
          } else if(idCliente) {
            url = 'http://localhost:8083/carrinho/cliente/' + idCliente;
          } else {
            url = 'http://localhost:8083/carrinho';
          }
          return this.http
            .post<Carrinho>(url, itemCarrinho)
            .pipe(tap(carrinho => this.carrinhoStorageService.salvarCarrinho(carrinho)));
        })
      );
  }

  obterCarrinhoLocal() {
    return this.carrinhoStorageService.obterCarrinho();
  }

  obterDadosCarrinho(): Observable<Carrinho> {
    const carrinhoLocal = this.carrinhoStorageService.obterCarrinho();
    if (carrinhoLocal) {
      return new Observable<Carrinho>(subscriber => subscriber.next(carrinhoLocal));
    } 

    const informacaoUsuario = this.authStorageService.obterDadosAutenticacao();
    const idCliente = informacaoUsuario && informacaoUsuario.idCliente ? informacaoUsuario.idCliente : null;
    let url;
    if (carrinhoLocal && carrinhoLocal.id && carrinhoLocal.id > 0) {
      url = 'http://localhost:8083/carrinho/' + carrinhoLocal.id;
    } else if (idCliente) {
      url = 'http://localhost:8083/carrinho/cliente/' + idCliente;
    } else {
      return of({} as Carrinho)
    }
    return this.http
      .get<Carrinho>(url)
      .pipe(
        map(carrinho => carrinho ? carrinho : {itensCarrinho: []}),
        tap(carrinho => this.carrinhoStorageService.salvarCarrinho(carrinho))
      );
  }

  adicionarEnderecosAoCarrinho(enderecos: Endereco[]): Endereco[] {
    this.carrinhoStorageService.adicionarEnderecosCarrinho(enderecos);
    return this.carrinhoStorageService.obterEnderecosCarrinho();
  }

  selecionarEndereco(enderecoSelecionado: Endereco) {
    this.carrinhoStorageService.selecionarEndereco(enderecoSelecionado);
  }

  excluirCarrinho() {
    return this.http
      .delete('http://localhost:8083/carrinho/' + this.carrinhoStorageService.obterCarrinho().id,
      {
        responseType: 'text' as 'json'
      });
  }
  
  excluirCarrinhoLocal() {
    this.carrinhoStorageService.excluirCarrinho()
  }

  adicionarQuantidade(itemCarrinho: ItemCarrinho) {
    const carrinhoLocal = this.carrinhoStorageService.obterCarrinho();
    const itemCarrinhoLocal = carrinhoLocal.itensCarrinho.find(itemCarrinhoLocal => itemCarrinhoLocal.produto.id === itemCarrinho.produto.id);
    itemCarrinhoLocal.quantidade++;
    return this.salvarCarrinho(carrinhoLocal);
  }

  reduzirQuantidade(itemCarrinho: ItemCarrinho) {
    const carrinhoLocal = this.carrinhoStorageService.obterCarrinho();
    const itemCarrinhoLocal = carrinhoLocal.itensCarrinho.find(itemCarrinhoLocal => itemCarrinhoLocal.produto.id === itemCarrinho.produto.id);
    itemCarrinhoLocal.quantidade--;
    return this.salvarCarrinho(carrinhoLocal);
    
  }

  alterarQuantidade(itemCarrinho: ItemCarrinho) {
    const carrinhoLocal = this.carrinhoStorageService.obterCarrinho();
    const itemCarrinhoLocal = carrinhoLocal.itensCarrinho.find(itemCarrinhoLocal => itemCarrinhoLocal.produto.id === itemCarrinho.produto.id);
    itemCarrinhoLocal.quantidade = itemCarrinho.quantidade;
    return this.salvarCarrinho(carrinhoLocal);
  }

  removerItem(itemCarrinho: ItemCarrinho) {
    const carrinhoLocal = this.carrinhoStorageService.obterCarrinho();
    const itemIndex = carrinhoLocal.itensCarrinho.indexOf(carrinhoLocal.itensCarrinho.find(itemCarrinhoLocal => itemCarrinhoLocal.produto.id === itemCarrinho.produto.id));
    carrinhoLocal.itensCarrinho.splice(itemIndex, 1);
    return this.salvarCarrinho(carrinhoLocal);
  }

  salvarCarrinho(carrinho: Carrinho) {
    return this.http
      .put<Carrinho>('http://localhost:8083/carrinho', carrinho, { observe: 'response' })
      .pipe(
        map(carrinhoSalvo => carrinhoSalvo.body ? carrinhoSalvo.body : {itensCarrinho: []}),
        tap(carrinhoSalvo => this.carrinhoStorageService.salvarCarrinho(carrinhoSalvo))
      );
  }

  obterCarrinhosPorProduto(titulo: string) {
    let params = {
      titulo: titulo,
    };
    return this.http.get<Carrinho[]>('http://localhost:8083/carrinho/produto', {
      params: params
    })
  }
  
}