interface Cupom {
  id?: number;
  codigo: string;
  percentual?: number;
  valor?: number; // Para o caso de cupom de troca
  inicioCampanha: Date;
  fimCampanha?: Date;
  utilizado?: boolean; // Identifica se o cliente já utilizou o cupom, para não usar mais de uma vez em diversas compras
  cliente?: CupomCliente;
}

interface CupomCliente {
  cupom: Cupom;
  cliente: Cliente;
  utilizado: boolean;
}