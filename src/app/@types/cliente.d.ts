interface  CadastroCliente {
  id?: number;
  nome: string;
  enderecos: Endereco[];
  documentos: Documento[];
  ativo?: boolean;
  tipoCliente?: TipoCliente;
  // email: string;
  // senha: string;
  // confirmacaoSenha?: string;
  // cpf: string;
  // genero: string;
  // dataNascimento: Date;
  // tipoTelefone: string;
  // telefone: string;
  // cartoes: Cartao[];
}

interface TipoCliente {
  id?: number;
  nome: string;
  descricao: string;
}