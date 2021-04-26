interface Telefone {
  tipoTelefone: TipoTelefone;
  numero: string;
  ramal?: string
}

interface TipoTelefone {
  id: number;
  dtCadastro: Date;
  nome: string;
  descricao: string;
}