interface Carrinho {
  id?: number;
  itensCarrinho: ItemCarrinho[];
  enderecos?: Endereco[];
  enderecoSelecionado?: Endereco;
  estadoFrete?: string;
  formasPagamento?: FormaPagamento[]
}

interface ItemCarrinho {
  id?: number;
  produto: Produto;
  quantidade: number;
}