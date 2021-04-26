interface  Cliente {
  id?: number;
    nome: string;
    enderecos: Endereco[];
    documentos: Documento[];
    ativo?: boolean;
    tipoCliente?: TipoCliente;
    email: string;
  senha?: string;
  confirmacaoSenha?: string;
  cpf?: string;
    genero?: Genero;
    dataNascimento?: Date;
  tipoTelefone: TipoTelefone;
  telefone: string;
    cartoes: Cartao[];
    telefones?: Telefone[];
    usuario?: Usuario;
  // usuario
  // telefones:Telefone[]
}

interface TipoCliente {
  id?: number;
  nome: string;
  descricao: string;
}

interface Genero {
  id?: number;
  nome: string;
  descricao: string;
}