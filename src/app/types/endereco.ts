import ChaveValor from "./chave-valor";

export interface TipoEndereco extends ChaveValor { }
export const tiposEnderecos: TipoEndereco[] = [
  {nome: 'ENTREGA', descricao: 'Entrega'},
  {nome: 'COBRANCA', descricao: 'Cobrança'},
];

export interface TipoResidencia extends ChaveValor { }
export const tiposResidencia: TipoResidencia[] = [
  {nome: 'CASA', descricao: 'Casa'},
  {nome: 'APARTAMENTO', descricao: 'Apartamento'},
  {nome: 'OUTRO', descricao: 'Outro'},
];

export interface TipoLogradouro extends ChaveValor { }
export const tiposLogradouro: TipoResidencia[] = [
  {nome: 'RUA', descricao: 'Rua'},
  {nome: 'AV', descricao: 'Avenida'},
  {nome: 'AL', descricao: 'Alameda'},
  {nome: 'PRACA', descricao: 'Praça'},
  {nome: 'TV', descricao: 'Travessa'},
  {nome: 'OUTRO', descricao: 'Outro'},
];