interface Produto {
  id?: number;
  titulo: string;
  autor: string;
  editora?: string;
  valor: number;
  caminhoImagem?: string;
  categorias?: CategoriaProduto[];
  ano?: string;
  edicao?: string;
  isbn?: string;
  numeroPagina?: string;
  sinopse?: string;
  altura?: string;
  largura?: string;
  peso?: string;
  profundidade?: string;
  codigoBarras?: string;
  ativo?: boolean;
}

interface GrupoPrecificacao {
  id?: number;
  nome: string;
  descricao: string;
  margemLucro: number;
}
