import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
    ) {
  }

  obterTiposEndereco(): Observable<TipoEndereco[]> {
    return this.http.get<TipoEndereco[]>('http://localhost:8083/tipos-endereco');
  }

  obterPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>('http://localhost:8083/paises');
  }

  obterEstados(pais?: Pais): Observable<Estado[]> {
    return this.http.get<Estado[]>('http://localhost:8083/estados/pais/' + pais?.id);
  }

  obterCidades(siglaEstado: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`http://localhost:8083/cidades/uf/${siglaEstado}`);
  }

  obterTiposResidencia(): Observable<TipoResidencia[]> {
    return this.http.get<TipoResidencia[]>(`http://localhost:8083/tipos-residencia`);
  }

  obterTiposLogradouro(): Observable<TipoLogradouro[]> {
    return this.http.get<TipoLogradouro[]>(`http://localhost:8083/tipos-logradouro`);
  }

  obterCidadePorID(idCidade: number): Observable<Cidade> {
    return this.http.get<Cidade>(`http://localhost:8083/cidades/id/${idCidade}`);
  }

  obterEnderecosCliente(tipoEndereco?: TipoEndereco) : Observable<Endereco[]>{
    const idCliente = this.authStorageService.obterDadosAutenticacao().idCliente;
    if (!idCliente) {
      return of([]);
    }

    let url = 'http://localhost:8083/enderecos/cliente/' + idCliente;
    if(tipoEndereco && tipoEndereco.id) {
      url += '/tipo-endereco/' + tipoEndereco.id;
    }

    return this.http.get<Endereco[]>(url);

    // return new Observable(subscriber => {
    //   console.log('Hello');
    //   subscriber.next([
    //     {
    //       id: 1,
    //       identificadorEndereco: 'Minha casa',
    //       tipoEndereco: {
    //         id: 1,
    //         nome: 'ENTREGA',
    //         descricao: 'Entrega'
    //       },
    //       tipoResidencia: {} as TipoResidencia,
    //       tipoLogradouro: 'string',
    //       logradouro: 'Rua Ipiranga',
    //       numero: '123',
    //       complemento: 'casa dos fundos',
    //       bairro: 'Centro',
    //       cep: '08770098',
    //       cidade: {
    //         id: 1,
    //         descricao: 'Mogi das Cruzes',
    //         estado: {
    //           id: 1,
    //           descricao: 'SP'
    //         }
    //       },
    //       estado: {
    //         id: 1,
    //         descricao: 'SP'
    //       },
    //     }
    //   ]);
    // });
  }
}