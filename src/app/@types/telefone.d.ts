interface Telefone {
  tipoTelefone: TipoTelefone;
  numero: string;
}

interface TipoTelefone {
  id: number;
  dtCadastro: Date;
  nome: string;
  descricao: string;
}