interface  CadastroCliente {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  confirmacaoSenha?: string;
  cpf: string;
  genero: string;
  dataNascimento: Date;
  tipoTelefone: string;
  telefone: string;
  enderecos: Endereco[];
  cartoes: Cartao[];
}