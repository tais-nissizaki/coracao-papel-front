interface Cartao {
  numero: number;
  nomeImpresso: string;
  validade: string;
  dataValidade?: string;
  cvv: number;
  bandeira: BandeiraCartao;
  bandeiraCartao?: BandeiraCartao;
  tipoCartao: TipoCartao;
  desejaCadastrarCartao?: boolean;
}

interface BandeiraCartao {
  id?: number;
  dtCadastro: Date;
  nome: string;
  descricao: string;
}

interface TipoCartao {
  id?: number;
  dtCadastro: Date;
  nome: string;
  descricao: string;
}