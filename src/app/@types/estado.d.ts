interface Estado {
  id: number;
  descricao: string;
  pais?: Pais;
}

interface Pais {
  id: number;
  dtCadastro: Date;
  descricao: string
}