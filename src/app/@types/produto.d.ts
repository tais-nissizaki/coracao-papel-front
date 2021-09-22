interface Produto {
  id?: number;
  titulo: string;
  autor: string;
  editora?: string;
  valor: number;
  caminhoImagem?: string;
  imagem?: string;
  imageBase64?: string;
  categorias?: CategoriaProduto[];
  ano?: string;
  anoEdicao?: string;
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
  quantidadeEstoque?: number;
  quantidadeDisponivel?: number;
  dimensao?: Dimensao;
  
}

interface Dimensao {
  altura?: string;
  largura?: string;
  peso?: string;
  profundidade?: string;
}

interface GrupoPrecificacao {
  id?: number;
  nome: string;
  descricao: string;
  margemLucro: number;
}
