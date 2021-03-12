interface Endereco {
  id?: number;
  tipoEndereco: TipoEndereco;
  tipoResidencia: string;
  tipoLogradouro: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: Cidade;
  estado?: Estado;
}

interface TipoEndereco {
  id?: number;
  nome: string;
  descricao: string;
}

interface Cidade {
  id?: number;
  descricao: string;
  estado: Estado;
}