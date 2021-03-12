interface Documento {
  id?: number;
  codigo: string;
  validade?: string;
  tipoDocumento: TipoDocumento;
}

interface TipoDocumento {
  id?: number;
  nome: string;
  descricao: string;
}