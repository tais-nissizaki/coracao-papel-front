interface Endereco {
  id?: number;
  identificadorEndereco: string;
  tipoEndereco: TipoEndereco;
  tipoResidencia: TipoResidencia;
  tipoLogradouro: TipoLogradouro;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: Cidade;
  estado?: Estado;
  salvarEnderecoAoCliente?: boolean;
}

interface TipoEndereco {
  id?: number;
  nome: string;
  descricao: string;
}

interface TipoResidencia {
  id?: number;
  nome: string;
  descricao: string;
}

interface TipoLogradouro {
  id?: number;
  nome: string;
  descricao: string;
}

interface Cidade {
  id?: number;
  descricao: string;
  estado: Estado;
}