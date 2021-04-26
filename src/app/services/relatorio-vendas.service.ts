import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioVendasService {

  constructor() { }

  relatorioVendasPorEstado(): Observable<FaturamentoPorEstado[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {estado: {id: 12, descricao: 'AC'}, valor:  662.4 },
        {estado: {id: 27, descricao: 'AL'}, valor:  122.96 },
        {estado: {id: 13, descricao: 'AM'}, valor:  927.67 },
        {estado: {id: 16, descricao: 'AP'}, valor:  899.36 },
        {estado: {id: 29, descricao: 'BA'}, valor:  173.11 },
        {estado: {id: 23, descricao: 'CE'}, valor:  696.92 },
        {estado: {id: 53, descricao: 'DF'}, valor:  391.86 },
        {estado: {id: 32, descricao: 'ES'}, valor:  255.9 },
        {estado: {id: 52, descricao: 'GO'}, valor:  98.05 },
        {estado: {id: 21, descricao: 'MA'}, valor:  655.35 },
        {estado: {id: 31, descricao: 'MG'}, valor:  134.41 },
        {estado: {id: 50, descricao: 'MS'}, valor:  337.38 },
        {estado: {id: 51, descricao: 'MT'}, valor:  285.36 },
        {estado: {id: 15, descricao: 'PA'}, valor:  925.27 },
        {estado: {id: 25, descricao: 'PB'}, valor:  47.84 },
        {estado: {id: 26, descricao: 'PE'}, valor:  629.47 },
        {estado: {id: 22, descricao: 'PI'}, valor:  825.79 },
        {estado: {id: 41, descricao: 'PR'}, valor:  189.24 },
        {estado: {id: 33, descricao: 'RJ'}, valor:  243.6 },
        {estado: {id: 24, descricao: 'RN'}, valor:  346.75 },
        {estado: {id: 11, descricao: 'RO'}, valor:  32.06 },
        {estado: {id: 14, descricao: 'RR'}, valor:  180.19 },
        {estado: {id: 43, descricao: 'RS'}, valor:  606.07 },
        {estado: {id: 42, descricao: 'SC'}, valor:  595.13 },
        {estado: {id: 28, descricao: 'SE'}, valor:  731 },
        {estado: {id: 35, descricao: 'SP'}, valor:  514.87 },
      ]);
    });
  }

  
  relatorioVendasPorCidade(estado: Estado, cidade?: Cidade): Observable<FaturamentoPorCidade[]> {
    return new Observable(subscriber => {
      if (!cidade) {
        subscriber.next([
          {
            cidade: {
              id: 1301704,
              descricao: 'Humaitá',
              estado: estado
            },
            valor: 139.34
          },
          {
            cidade: {
              id: 1303957,
              descricao: 'São Sebastião do Uatumã',
              estado: estado
            },
            valor: 539.34
          }
        ]);
      } else {
        subscriber.next([
          {
            cidade: cidade,
            valor: 139.34
          },
        ]);
      }
    })
  }

  
  relatorioVendasPorFaixaEtaria(): Observable<FaturamentoPorFaixaEtaria[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          faixaEtaria: {
            idadeMaxima: 25, 
          },
          valor: 134.43
        }, 
        {
          faixaEtaria: {
            idadeMinima: 26,
            idadeMaxima: 30, 
          },
          valor: 648.15
        }, 
        {
          faixaEtaria: {
            idadeMinima: 31,
            idadeMaxima: 40, 
          },
          valor: 832.27
        }, 
        {
          faixaEtaria: {
            idadeMinima: 41,
            idadeMaxima: 50, 
          },
          valor: 647.43
        }, 
        {
          faixaEtaria: {
            idadeMinima: 51, 
          },
          valor: 365.56
        }, 
      ])
    })
  }

  relatorioVendasPorGenero(): Observable<FaturamentoPorGenero[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          genero: {
            id: 1,
            nome: 'FEMNINO',
            descricao: "Feminino"
          },
          valor: 3583.86
        },
        {
          genero: {
            id: 2,
            nome: 'MASCULINO',
            descricao: "Masculino"
          },
          valor: 2165.64
        },
        {
          genero: {
            id: 3,
            nome: 'OUTRO',
            descricao: "Outro"
          },
          valor: 1155.64
        }
      ])
    })
  }

  relatorioVendasPorTipoCliente(): Observable<FaturamentoPorTipoCliente[]> {
    return new Observable(subscriber => {
      subscriber.next([
        {
          tipoCliente: {
            id: 1, 
            nome: 'BRONZE',
            descricao: 'Cliente bronze'
          },
          valor: 2113.23
        },
        
        {
          tipoCliente: {
            id: 2, 
            nome: 'PRATA',
            descricao: 'Cliente prata'
          },
          valor: 3616.92
        },
        
        {
          tipoCliente: {
            id: 3, 
            nome: 'OURO',
            descricao: 'Cliente ouro'
          },
          valor: 4825.39
        }
      ])
    })
  }

  relatorioVendasPorPeriodo(mesesPeriodo: number): Observable<FaturamentoPorPeriodo[]> {
    const faturamento: FaturamentoPorPeriodo[] = [];
    let date = new Date();
    for (let mes = 0; mes < mesesPeriodo; mes++) {
      date = new Date(date);
      date.setMonth(date.getMonth()-1);
      faturamento.push({
        mes: date,
        valor: Math.random() * 3000
      })
    }
    return new Observable(subscriber => {
      subscriber.next(faturamento);
    })
  }
}
