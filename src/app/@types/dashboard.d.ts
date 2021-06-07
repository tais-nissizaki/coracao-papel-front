interface Dashboard {
  itemsDashBoard: ItemDasboard[];
}

interface ItemDasboard {
  item: string | Produto | CategoriaProduto;
  itensPorData: ItemPorData[];
}

interface ItemPorData {
  data: Date;
  quantidade: number;
}