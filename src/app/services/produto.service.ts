import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtoDetalhe?: Produto;

  constructor() {
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
    return new Observable(subscriber => {
      if (produtoFiltro && produtoFiltro.length > 0) {
        console.log('produtoFiltro', produtoFiltro);
        const produtos = this.obterProdutos().filter(produto => {
          return produto.titulo.toLowerCase().includes(produtoFiltro?.toLowerCase() || '')
        });
        subscriber.next(produtos);
        return;
      }
    });
  }

  obterProdutos(): Produto[] {
    return [
      {
        id: 1,
        titulo: 'O Código da Vinci',
        autor: 'Brown, Dan',
        valor: 49.90,
        caminhoImagem: '/assets/codigo_da_vinci.jpg'
      },
      {
        id: 2,
        titulo: 'Fortaleza Digital',
        autor: 'Brown, Dan',
        valor: 39.90,
        caminhoImagem: '/assets/fortaleza_digital.jpg'
      },
      {
        id: 3,
        titulo: 'O Pequeno Príncipe',
        autor: 'de Saint-Exupery, Antoine',
        valor: 29.90,
        caminhoImagem: '/assets/o_pequeno_principe.jpg'
      },
      {
        id: 4,
        titulo: 'O Iluminado',
        autor: 'King, Stephen',
        valor: 59.90,
        caminhoImagem: '/assets/o_iluminado.jpg'
      },
      {
        id: 5,
        titulo: 'Box Sherlock Holmes',
        autor: 'Doyle, Arthur Conan',
        valor: 89.90,
        caminhoImagem: '/assets/box_sherlock_holmes.jpg'
      },
      {
        id: 6,
        titulo: 'A divina comédia',
        autor: 'Alighieri, Dante',
        valor: 69.90,
        caminhoImagem: '/assets/a_divina_comedia.jpg'
      },
      {
        id: 7,
        titulo: 'A revolução dos bichos',
        autor: 'Orwell, George',
        valor: 35.90,
        caminhoImagem: '/assets/a_revolucao_dos_bichos.jpg'
      },
    ]
  }


}