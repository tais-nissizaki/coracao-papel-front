const pedidos = [
  {
    numero: 1235,
    dataEntrega: new Date(),
    dataPedido: new Date(),
    valorFrete: 15.95,
    valorPedido: 55.85,
    enderecoEntrega: {
      id: 12,
      logradouro: 'Rua Braz Cubas',
      numero: '10',
      complemento: 'Casa 2',
      bairro: 'Centro',
      cidade: {
        id: 12,
        descricao: 'Mogi das Cruzes',
        estado: {
          id: 12,
          descricao: 'SP'
        }
      },
      cep: '08770-010',
      identificadorEndereco: 'Teste',
      tipoEndereco: {
        id: 1,
        descricao: 'Entrega',
        nome: 'ENTREGA'
      },
      tipoLogradouro: {
        id: 1,
        descricao: 'Rua',
        nome: 'RUA'
      },
      tipoResidencia: {
        id: 1,
        nome: 'CASA',
        descricao: 'Casa'
      },
    },
    produtos:  [
      {
        quantidade: 1,
        produto: {
          id: 1,
          autor: 'King, Stephen',
          titulo: 'O Iluminado',
          valor: 59.90,
        }
      }
    ],
    status: {
      id: 2,
      nome: 'APROVADO',
      descricao: 'Aprovado'
    },
    transacoes: [
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 23, 14),
        descricao: 'Aguardando pagamento'
      },
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 31, 51),
        descricao: 'Pagamento aprovado'
      },
    ]
  },
  {
    numero: 1235,
    dataEntrega: new Date(),
    dataPedido: new Date(),
    valorFrete: 15.95,
    valorPedido: 55.85,
    enderecoEntrega: {
      id: 12,
      logradouro: 'Rua Braz Cubas',
      numero: '10',
      complemento: 'Casa 2',
      bairro: 'Centro',
      cidade: {
        id: 12,
        descricao: 'Mogi das Cruzes',
        estado: {
          id: 12,
          descricao: 'SP'
        }
      },
      cep: '08770-010',
      identificadorEndereco: 'Teste',
      tipoEndereco: {
        id: 1,
        descricao: 'Entrega',
        nome: 'ENTREGA'
      },
      tipoLogradouro: {
        id: 1,
        descricao: 'Rua',
        nome: 'RUA'
      },
      tipoResidencia: {
        id: 1,
        nome: 'CASA',
        descricao: 'Casa'
      },
    },
    produtos:  [
      {
        quantidade: 1,
        produto: {
          id: 1,
          autor: 'King, Stephen',
          titulo: 'O Iluminado',
          valor: 59.90,
        }
      }
    ],
    status: {
      id: 3,
      nome: 'EM_TRANSITO',
      descricao: 'Em transito'
    },
    transacoes: [
      {
        id: 1,
        data: new Date(2021, 2, 1),
        descricao: 'Aguardando pagamento'
      },
      {
        id: 1,
        data: new Date(2021, 2, 1),
        descricao: 'Pagamento aprovado'
      },
      {
        id: 1,
        data: new Date(2021, 2, 2),
        descricao: 'Enviado à transportadora'
      },
    ]
  },
  {
    numero: 1235,
    dataEntrega: new Date(),
    dataPedido: new Date(),
    valorFrete: 15.95,
    valorPedido: 55.85,
    enderecoEntrega: {
      id: 12,
      logradouro: 'Rua Braz Cubas',
      numero: '10',
      complemento: 'Casa 2',
      bairro: 'Centro',
      cidade: {
        id: 12,
        descricao: 'Mogi das Cruzes',
        estado: {
          id: 12,
          descricao: 'SP'
        }
      },
      cep: '08770-010',
      identificadorEndereco: 'Teste',
      tipoEndereco: {
        id: 1,
        descricao: 'Entrega',
        nome: 'ENTREGA'
      },
      tipoLogradouro: {
        id: 1,
        descricao: 'Rua',
        nome: 'RUA'
      },
      tipoResidencia: {
        id: 1,
        nome: 'CASA',
        descricao: 'Casa'
      },
    },
    produtos:  [
      {
        quantidade: 1,
        produto: {
          id: 1,
          autor: 'King, Stephen',
          titulo: 'O Iluminado',
          valor: 59.90,
        }
      }
    ],
    status: {
      id: 6,
      nome: 'EM_TROCA',
      descricao: 'Em troca'
    },
    transacoes: [
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 23, 14),
        descricao: 'Aguardando pagamento'
      },
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 31, 51),
        descricao: 'Pagamento aprovado'
      },
      {
        id: 1,
        data: new Date(2021, 2, 2, 9, 31, 51),
        descricao: 'Em transporte'
      },
      {
        id: 1,
        data: new Date(2021, 2, 4, 16, 48, 21),
        descricao: 'Entrega efetuada'
      },
      {
        id: 1,
        data: new Date(2021, 2, 5, 14, 15, 12),
        descricao: 'Troca solicitada'
      },
    ]
  },
  {
    numero: 1235,
    dataEntrega: new Date(),
    dataPedido: new Date(),
    valorFrete: 15.95,
    valorPedido: 55.85,
    enderecoEntrega: {
      id: 12,
      logradouro: 'Rua Braz Cubas',
      numero: '10',
      complemento: 'Casa 2',
      bairro: 'Centro',
      cidade: {
        id: 12,
        descricao: 'Mogi das Cruzes',
        estado: {
          id: 12,
          descricao: 'SP'
        }
      },
      cep: '08770-010',
      identificadorEndereco: 'Teste',
      tipoEndereco: {
        id: 1,
        descricao: 'Entrega',
        nome: 'ENTREGA'
      },
      tipoLogradouro: {
        id: 1,
        descricao: 'Rua',
        nome: 'RUA'
      },
      tipoResidencia: {
        id: 1,
        nome: 'CASA',
        descricao: 'Casa'
      },
    },
    produtos:  [
      {
        quantidade: 1,
        produto: {
          id: 1,
          autor: 'King, Stephen',
          titulo: 'O Iluminado',
          valor: 59.90,
        }
      }
    ],
    status: {
      id: 7,
      nome: 'TROCA_AUTORIZADA',
      descricao: 'Troca autorizada'
    },
    transacoes: [
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 23, 14),
        descricao: 'Aguardando pagamento'
      },
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 31, 51),
        descricao: 'Pagamento aprovado'
      },
      {
        id: 1,
        data: new Date(2021, 2, 2, 9, 31, 51),
        descricao: 'Em transporte'
      },
      {
        id: 1,
        data: new Date(2021, 2, 4, 16, 48, 21),
        descricao: 'Entrega efetuada'
      },
      {
        id: 1,
        data: new Date(2021, 2, 5, 14, 15, 12),
        descricao: 'Troca solicitada'
      },
      {
        id: 1,
        data: new Date(2021, 2, 5, 20, 13, 42),
        descricao: 'Troca autorizada'
      },
    ]
  },
  {
    numero: 1235,
    dataEntrega: new Date(),
    dataPedido: new Date(),
    valorFrete: 15.95,
    valorPedido: 55.85,
    enderecoEntrega: {
      id: 12,
      logradouro: 'Rua Braz Cubas',
      numero: '10',
      complemento: 'Casa 2',
      bairro: 'Centro',
      cidade: {
        id: 12,
        descricao: 'Mogi das Cruzes',
        estado: {
          id: 12,
          descricao: 'SP'
        }
      },
      cep: '08770-010',
      identificadorEndereco: 'Teste',
      tipoEndereco: {
        id: 1,
        descricao: 'Entrega',
        nome: 'ENTREGA'
      },
      tipoLogradouro: {
        id: 1,
        descricao: 'Rua',
        nome: 'RUA'
      },
      tipoResidencia: {
        id: 1,
        nome: 'CASA',
        descricao: 'Casa'
      },
    },
    produtos:  [
      {
        quantidade: 1,
        produto: {
          id: 1,
          autor: 'King, Stephen',
          titulo: 'O Iluminado',
          valor: 59.90,
        }
      }
    ],
    status: {
      id: 8,
      nome: 'TROCADO',
      descricao: 'Trocado'
    },
    transacoes: [
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 23, 14),
        descricao: 'Aguardando pagamento'
      },
      {
        id: 1,
        data: new Date(2021, 2, 1, 12, 31, 51),
        descricao: 'Pagamento aprovado'
      },
      {
        id: 1,
        data: new Date(2021, 2, 2, 9, 31, 51),
        descricao: 'Em transporte'
      },
      {
        id: 1,
        data: new Date(2021, 2, 4, 16, 48, 21),
        descricao: 'Entrega efetuada'
      },
      {
        id: 1,
        data: new Date(2021, 2, 5, 14, 15, 12),
        descricao: 'Troca solicitada'
      },
      {
        id: 1,
        data: new Date(2021, 2, 5, 20, 13, 42),
        descricao: 'Troca autorizada'
      },
      {
        id: 1,
        data: new Date(2021, 2, 7, 22, 13, 42),
        descricao: 'Troca finalizada'
      },
      {
        id: 1,
        data: new Date(2021, 2, 7, 22, 15, 12),
        descricao: 'Cupom de toca TROCA5585 gerado'
      },
    ]
  },
  
]
export default pedidos;