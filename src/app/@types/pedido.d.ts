interface Pedido {
  numero?: number;
  dataPedido: Date;
  dataEntrega: Date;
  enderecoEntrega: Endereco;
  valorPedido: number;
  valorFrete: number;
  produtos: ItemPedido[];
  cupons?: string[];
  selecionado?: boolean;
  status?: StatusPedido;
  tipoPedido?: TipoPedido;
  transacoes?: Transacao[];
  trocaSolicitada?: boolean;
}

interface SolicitacaoPedido {
  id?: number;
  dtCadastro?: Date; // Data do pedido
  valorTotal: number;
  cliente: {
    id: number;
  };
  status: StatusPedido;
  statusPedido?: StatusPedido;
  itensPedido: ItemPedido[];
  enderecoEntrega: Entrega;
  pedidoPagamentos: Pagamento[];
  cupons: CupomPedido[];
  transacoesPedido?: Transacao[];
  selecionado?: boolean;
  trocaSolicitada?: boolean;
}

interface CupomPedido {
  id?: number;
  dtCadastro?: Date;
  cupom: Cupom;
}

interface ItemPedido {
  selecionado?: boolean;
  produto: Produto;
  quantidade: number;
}

interface Entrega {
  valorFrete: number;
  dataEntrega?: Date;
  endereco: Endereco;
}

interface Pagamento {
  valor: number;
  cartao: Cartao;
}

interface StatusPedido {
  id: number;
  nome: string;
  descricao: string;
}

// Se é do tipo Compra ou Troca
interface TipoPedido {
  id?: number;
  nome: string;
  descricao: string;
}

interface Transacao {
  id: number,
  data: Date;
  dtCadastro?: Date;
  descricao: string;
}
