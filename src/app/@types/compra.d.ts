interface Compra {
  fornecedor: Fornecedor;
  itensCompra: ItemCompra[];
}

interface ItemCompra {
  quantidade: number;
  valorCompra: number;
  produto: Produto;
}