interface Login {
  email: string;
  senha: string;
}

interface LoginAdministrador {
  usuario: string;
  senha: string;
}

interface InformacaoAutenticao {
  basicToken: string;
  expiracao: Date;
  permissoes: string[];
  idCliente?: number;
}

interface Usuario {
  nomeUsuario: string;
  senha: string;
  confirmacaoSenha: string;
}

interface DadosUsuario {
  permissoes: string[];
  idCliente?: number;
}