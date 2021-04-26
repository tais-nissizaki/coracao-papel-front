interface QuantidadePorEstado {
  estado: Estado;
  quantidade: number;
}



interface FaturamentoPorEstado {
  estado: Estado;
  valor: number;
}
interface FaturamentoPorCidade {
  cidade: Cidade;
  valor: number;
}
interface FaturamentoPorFaixaEtaria {
  faixaEtaria: FaixaEtaria;
  valor: number;
}
interface FaturamentoPorGenero {
  genero: Genero;
  valor: number;
}
interface FaturamentoPorTipoCliente {
  tipoCliente: TipoCliente;
  valor: number;
}
interface FaturamentoPorPeriodo {
  mes: Date;
  valor: number;
}