import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoStorageService {

  private CHAVE_CARRINHO = 'carrinho'

  constructor() { }

  obterCarrinho(): Carrinho | null {
    const carrinhoJSON = sessionStorage.getItem(this.CHAVE_CARRINHO);
    if(carrinhoJSON && carrinhoJSON.length > 0) {
      return JSON.parse(carrinhoJSON);
    } 
    return null;
  }

  salvarCarrinho(carrinho: Carrinho) {
    if(carrinho) {
      sessionStorage.setItem(this.CHAVE_CARRINHO, JSON.stringify(carrinho));
    }
    return carrinho;
  }

  adicionarAoCarrinho(produto: Produto, quantidade: number) {
    const carrinho = this.obterCarrinho();
    if (carrinho) {
      const itemCarrinho = carrinho.itensCarrinho.find(itemCarrinho => itemCarrinho.produto.id === produto.id);
      if (itemCarrinho) {
        itemCarrinho.quantidade = quantidade;
      } else {
        carrinho.itensCarrinho.push({
          quantidade: quantidade,
          produto: produto
        });
      }
      this.salvarCarrinho(carrinho);
    } else {
      const novoCarrinho: Carrinho = {
        itensCarrinho: [
          {
            quantidade: quantidade,
            produto: produto
          }
        ]
      }
      this.salvarCarrinho(novoCarrinho);
    }
  }

  adicionarEnderecosCarrinho(enderecos: Endereco[]): void {
    const carrinho = this.obterCarrinho();
    const enderecosCarrinho = carrinho?.enderecos || [];
    const enderecosTotais = [ ...enderecosCarrinho, ...enderecos ];
    const enderecosUnicos = enderecosTotais.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)

    carrinho.enderecos = [ ...enderecosUnicos ];
    this.salvarCarrinho(carrinho);
  }

  obterEnderecosCarrinho(): Endereco[] {
    return this.obterCarrinho().enderecos || [];
  }

  selecionarEndereco(enderecoSelecionado: Endereco) {
    const carrinho = this.obterCarrinho();
    carrinho.enderecoSelecionado = enderecoSelecionado;
    this.salvarCarrinho(carrinho);
  }

  excluirCarrinho() {
    sessionStorage.removeItem(this.CHAVE_CARRINHO);
  }
}
